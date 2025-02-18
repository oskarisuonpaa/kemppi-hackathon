import express from "express";
import request from "supertest";
import { dataRouter } from "../src/controllers/data";
import { WeldingData } from "../src/models/weldingData";

interface CustomRequest extends express.Request {
  user?: any;
}

let app: express.Application;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.use((req: CustomRequest, res, next) => {
    req.user = { role: "admin", group: ["Test group", "Another group"] };
    next();
  });
  app.use("/api/data", dataRouter);
});

beforeEach(async () => {
  await WeldingData.deleteMany({});
});

describe("GET /api/data", () => {
  beforeEach(async () => {
    const rec1 = new WeldingData({
      timestamp: new Date("2025-01-01T12:00:00Z"),
      weldingMachine: {
        model: "MegaWelder",
        serial: "12345",
        name: "WeldMaster",
        group: "Test group",
      },
      weldingParameters: {
        current: { min: 100, max: 200, avg: 150 },
        voltage: { min: 20, max: 30, avg: 25 },
      },
      weldDurationMs: {
        preWeldMs: 100,
        weldMs: 500,
        postWeldMs: 100,
        totalMs: 700,
      },
      materialConsumption: {
        wireConsumptionInMeters: 10,
        gasConsumptionInLiters: 20,
        fillerConsumptionInGrams: 30,
        energyConsumptionAsWh: 40,
      },
    });
    const rec2 = new WeldingData({
      timestamp: new Date("2025-01-02T12:00:00Z"),
      weldingMachine: {
        model: "MegaWelder",
        serial: "12345",
        name: "WeldMaster",
        group: "Other group",
      },
      weldingParameters: {
        current: { min: 100, max: 200, avg: 150 },
        voltage: { min: 20, max: 30, avg: 25 },
      },
      weldDurationMs: {
        preWeldMs: 100,
        weldMs: 500,
        postWeldMs: 100,
        totalMs: 700,
      },
      materialConsumption: {
        wireConsumptionInMeters: 10,
        gasConsumptionInLiters: 20,
        fillerConsumptionInGrams: 30,
        energyConsumptionAsWh: 40,
      },
    });
    await rec1.save();
    await rec2.save();
  });

  it("should return all welding data sorted by timestamp for admin", async () => {
    const response = await request(app).get("/api/data").expect(200);
    expect(response.body.length).toBe(2);
    const ts0 = new Date(response.body[0].timestamp).getTime();
    const ts1 = new Date(response.body[1].timestamp).getTime();
    expect(ts0).toBeLessThanOrEqual(ts1);
    // Admin sees all fields.
    expect(response.body[0]).toHaveProperty("weldingParameters");
    expect(response.body[0]).toHaveProperty("materialConsumption");
    expect(response.body[0]).toHaveProperty("weldDurationMs");
  });

  it("should filter data based on viewer's allowed groups", async () => {
    // Create a new app instance with viewer middleware placed before the router.
    const viewerApp = express();
    viewerApp.use(express.json());
    viewerApp.use((req: CustomRequest, res, next) => {
      req.user = { role: "viewer", group: ["Test group"] };
      next();
    });
    viewerApp.use("/api/data", dataRouter);

    const response = await request(viewerApp).get("/api/data").expect(200);
    expect(response.body.length).toBe(1);

    const record1 = response.body.find(
      (item: any) => item.weldingMachine.group === "Test group"
    );
    const record2 = response.body.find(
      (item: any) => item.weldingMachine.group === "Other group"
    );

    expect(record1).toHaveProperty("weldingParameters");
    expect(record1).toHaveProperty("materialConsumption");
    expect(record1).toHaveProperty("weldDurationMs");

    expect(record2).toBeUndefined();
  });

  it("should filter data by weldingMachine.model", async () => {
    const response = await request(app)
      .get("/api/data")
      .query({ model: "MegaWelder" })
      .expect(200);
    expect(response.body.length).toBe(2);
    response.body.forEach((data: any) => {
      expect(data.weldingMachine.model).toBe("MegaWelder");
    });
  });

  it("should filter data by current average range", async () => {
    const response = await request(app)
      .get("/api/data")
      .query({ currentMin: "140", currentMax: "160" })
      .expect(200);
    expect(response.body.length).toBe(2);
  });

  it("should return 500 if an error occurs", async () => {
    const originalFind = WeldingData.find;
    (WeldingData.find as any) = () => {
      throw new Error("Test error");
    };

    const response = await request(app).get("/api/data").expect(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
    WeldingData.find = originalFind;
  });
});

describe("POST /api/data", () => {
  it("should create new welding data and return it", async () => {
    const newData = {
      timestamp: "2025-01-03T12:00:00Z",
      weldingMachine: {
        model: "SuperWelder",
        serial: "54321",
        name: "WeldPro",
        group: "Welding group 2",
      },
      weldingParameters: {
        current: { min: 80, max: 120, avg: 100 },
        voltage: { min: 15, max: 25, avg: 20 },
      },
      weldDurationMs: {
        preWeldMs: 200,
        weldMs: 600,
        postWeldMs: 150,
        totalMs: 950,
      },
      materialConsumption: {
        wireConsumptionInMeters: 10,
        gasConsumptionInLiters: 20,
        fillerConsumptionInGrams: 30,
        energyConsumptionAsWh: 40,
      },
    };

    const response = await request(app).post("/api/data").send(newData).expect(201);

    expect(new Date(response.body.timestamp).toISOString()).toBe(
      new Date(newData.timestamp).toISOString()
    );
    expect(response.body.weldingMachine).toMatchObject(newData.weldingMachine);
    expect(response.body.weldingParameters).toMatchObject(newData.weldingParameters);
    expect(response.body.weldDurationMs).toMatchObject(newData.weldDurationMs);

    const savedData = await WeldingData.findOne({ "weldingMachine.serial": "54321" });
    expect(savedData).toBeTruthy();
  });
});

describe("DELETE /api/data/:id", () => {
  it("should delete the specified welding data", async () => {
    const recordToDelete = new WeldingData({
      timestamp: new Date("2025-01-04T12:00:00Z"),
      weldingMachine: {
        model: "ToDelete",
        serial: "del123",
        name: "DeleteMe",
        group: "Test group",
      },
      weldingParameters: {
        current: { min: 50, max: 100, avg: 75 },
        voltage: { min: 10, max: 20, avg: 15 },
      },
      weldDurationMs: {
        preWeldMs: 100,
        weldMs: 500,
        postWeldMs: 100,
        totalMs: 700,
      },
      materialConsumption: {
        wireConsumptionInMeters: 5,
        gasConsumptionInLiters: 10,
        fillerConsumptionInGrams: 15,
        energyConsumptionAsWh: 20,
      },
    });
    await recordToDelete.save();
    const id = recordToDelete._id.toString();

    await request(app).delete(`/api/data/${id}`).expect(204);

    const deletedRecord = await WeldingData.findById(id);
    expect(deletedRecord).toBeNull();
  });

  it("should return 500 if deletion fails", async () => {
    const originalDelete = WeldingData.findByIdAndDelete;
    (WeldingData.findByIdAndDelete as any) = jest
      .fn()
      .mockRejectedValue(new Error("Delete error"));

    const response = await request(app).delete("/api/data/invalidid").expect(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });

    WeldingData.findByIdAndDelete = originalDelete;
  });
});

describe("PUT /api/data/:id", () => {
  it("should update the specified welding data and return the updated document", async () => {
    const recordToUpdate = new WeldingData({
      timestamp: new Date("2025-01-05T12:00:00Z"),
      weldingMachine: {
        model: "ToUpdate",
        serial: "upd123",
        name: "UpdateMe",
        group: "Test group",
      },
      weldingParameters: {
        current: { min: 50, max: 100, avg: 75 },
        voltage: { min: 10, max: 20, avg: 15 },
      },
      weldDurationMs: {
        preWeldMs: 100,
        weldMs: 500,
        postWeldMs: 100,
        totalMs: 700,
      },
      materialConsumption: {
        wireConsumptionInMeters: 5,
        gasConsumptionInLiters: 10,
        fillerConsumptionInGrams: 15,
        energyConsumptionAsWh: 20,
      },
    });
    await recordToUpdate.save();
    const id = recordToUpdate._id.toString();

    const updatePayload = {
      timestamp: "2025-01-06T12:00:00Z",
      weldingMachine: {
        model: "UpdatedModel",
        serial: "upd123",
        name: "UpdatedName",
        group: "Updated group",
      },
      weldingParameters: {
        current: { min: 60, max: 110, avg: 85 },
        voltage: { min: 12, max: 22, avg: 17 },
      },
      weldDurationMs: {
        preWeldMs: 150,
        weldMs: 550,
        postWeldMs: 150,
        totalMs: 850,
      },
      materialConsumption: {
        wireConsumptionInMeters: 5,
        gasConsumptionInLiters: 10,
        fillerConsumptionInGrams: 15,
        energyConsumptionAsWh: 20,
      },
    };

    const response = await request(app)
      .put(`/api/data/${id}`)
      .send(updatePayload)
      .expect(200);

    expect(new Date(response.body.timestamp).toISOString()).toBe(
      new Date(updatePayload.timestamp).toISOString()
    );
    expect(response.body.weldingMachine).toMatchObject(updatePayload.weldingMachine);
    expect(response.body.weldingParameters).toMatchObject(
      updatePayload.weldingParameters
    );
    expect(response.body.weldDurationMs).toMatchObject(updatePayload.weldDurationMs);
  });

  it("should return 500 if updating welding data fails", async () => {
    const originalUpdate = WeldingData.findByIdAndUpdate;
    (WeldingData.findByIdAndUpdate as any) = jest
      .fn()
      .mockRejectedValue(new Error("Update error"));

    const response = await request(app)
      .put("/api/data/invalidid")
      .send({
        timestamp: "2025-01-06T12:00:00Z",
        weldingMachine: {
          model: "UpdatedModel",
          serial: "upd123",
          name: "UpdatedName",
          group: "Updated group",
        },
        weldingParameters: {
          current: { min: 60, max: 110, avg: 85 },
          voltage: { min: 12, max: 22, avg: 17 },
        },
        weldDurationMs: {
          preWeldMs: 150,
          weldMs: 550,
          postWeldMs: 150,
          totalMs: 850,
        },
        materialConsumption: {
          wireConsumptionInMeters: 5,
          gasConsumptionInLiters: 10,
          fillerConsumptionInGrams: 15,
          energyConsumptionAsWh: 20,
        },
      })
      .expect(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });

    WeldingData.findByIdAndUpdate = originalUpdate;
  });
});
