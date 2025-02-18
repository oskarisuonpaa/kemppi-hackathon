import { Router, Request, Response } from "express";
import { WeldingData } from "../models/weldingData";
import { roleDataFilter } from "../utils/roleDataFilter";

interface CustomRequest extends Request {
  user?: any;
}

export const dataRouter = Router();

/**
 * GET /api/data
 * Example query params:
 * ?model=SuperWelder
 * &serial=12345
 * &name=WeldMaster
 * &group=Welding Department
 * &currentMin=50
 * &currentMax=100
 * &voltageMin=10
 * &voltageMax=20
 * &startDate=2025-01-01T00:00:00Z
 * &endDate=2025-01-02T00:00:00Z
 *
dataRouter.get("/", async (req: CustomRequest, res: Response) => {
 * numeric values return results which average is within the range
 * date values return results which timestamp is within the range
 */
dataRouter.get("/", async (req: CustomRequest, res: Response) => {
  const {
    model,
    serial,
    name,
    group,
    currentMin,
    currentMax,
    voltageMin,
    voltageMax,
    startDate,
    endDate,
  } = req.query as Record<string, string>;

  const filter: Record<string, any> = {};

  if (model) {
    filter["weldingMachine.model"] = model;
  }

  if (serial) {
    filter["weldingMachine.serial"] = serial;
  }

  if (name) {
    filter["weldingMachine.name"] = name;
  }

  if (group) {
    filter["weldingMachine.group"] = group;
  }

  if (currentMin || currentMax) {
    const rangeObj: Record<string, number> = {};
    if (currentMin) {
      rangeObj.$gte = Number(currentMin);
    }
    if (currentMax) {
      rangeObj.$lte = Number(currentMax);
    }
    if (Object.keys(rangeObj).length > 0) {
      filter["weldingParameters.current.avg"] = rangeObj;
    }
  }

  if (voltageMin || voltageMax) {
    const rangeObj: Record<string, number> = {};
    if (voltageMin) {
      rangeObj.$gte = Number(voltageMin);
    }
    if (voltageMax) {
      rangeObj.$lte = Number(voltageMax);
    }
    if (Object.keys(rangeObj).length > 0) {
      filter["weldingParameters.voltage.avg"] = rangeObj;
    }
  }

  if (startDate || endDate) {
    const dateRange: Record<string, Date> = {};

    if (startDate) {
      dateRange.$gte = new Date(startDate);
    }
    if (endDate) {
      dateRange.$lte = new Date(endDate);
    }

    if (Object.keys(dateRange).length > 0) {
      filter.timestamp = dateRange;
    }
  }
  try {
    const results = await WeldingData.find(filter);

    results.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    if (!req.user) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const { role, group: allowedGroups } = req.user;

    const roleFilteredResults = roleDataFilter(role, allowedGroups, results);

    res.status(200).json(roleFilteredResults);
  } catch (error) {
    console.error("Error fetching welding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * POST /api/data
 * Example request body:
 * {
 *  "timestamp": "2025-01-01T12:00:00Z",
 * "weldingMachine": {
 *  "model": "SuperWelder",
 * "serial": "12345",
 * "name": "WeldMaster",
 * "group": "Welding Department"
 * },
 * "weldingParameters": {
 * "current": {
 * "min": 50,
 * "max": 100,
 * "avg": 75
 * },
 * "voltage": {
 * "min": 10,
 * "max": 20,
 * "avg": 15
 * }
 * },
 * "weldDurationMs": {
 * "preWeldMs": 1000,
 * "weldMs": 5000,
 * }
 * }
 */
dataRouter.post("/", async (req: Request, res: Response) => {
  try {
    const {
      timestamp,
      weldingMachine,
      weldingParameters,
      weldDurationMs,
      materialConsumption,
    } = req.body;

    const newWeldingData = new WeldingData({
      timestamp,
      weldingMachine,
      weldingParameters,
      weldDurationMs,
      materialConsumption,
    });

    await newWeldingData.save();

    res.status(201).json(newWeldingData);
  } catch (error) {
    console.error("Error saving welding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * DELETE /api/data/:id
 */

dataRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await WeldingData.findByIdAndDelete(id);

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting welding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * PUT /api/data/:id
 */
dataRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { timestamp, weldingMachine, weldingParameters, weldDurationMs } = req.body;

    const updatedWeldingData = await WeldingData.findByIdAndUpdate(
      id,
      {
        timestamp,
        weldingMachine,
        weldingParameters,
        weldDurationMs,
      },
      { new: true }
    );

    res.status(200).json(updatedWeldingData);
  } catch (error) {
    console.error("Error updating welding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
