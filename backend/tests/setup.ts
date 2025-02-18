import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { beforeAll, afterAll } from "@jest/globals";
import { WeldingData } from "../src/models/weldingData";
import User from "../src/models/user";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  const weldingData = new WeldingData({
    timestamp: new Date(),
    weldingMachine: {
      model: "MegaWelder",
      serial: "12345",
      name: "WeldMaster",
      group: "Welding group",
    },
    weldingParameters: {
      current: {
        min: 100,
        max: 200,
        avg: 150,
      },
      voltage: {
        min: 20,
        max: 30,
        avg: 25,
      },
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

  await weldingData.save();

  const weldingData2 = new WeldingData({
    timestamp: new Date(),
    weldingMachine: {
      model: "MegaWelder",
      serial: "12345",
      name: "WeldMaster",
      group: "Welding group",
    },
    weldingParameters: {
      current: {
        min: 100,
        max: 200,
        avg: 150,
      },
      voltage: {
        min: 20,
        max: 30,
        avg: 25,
      },
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

  await weldingData2.save();

  const user = new User({
    username: "admin",
    name: "Admin",
    passwordHash: "admin",
    role: "admin",
  });

  await user.save();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
