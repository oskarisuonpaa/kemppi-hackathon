import { Router, Request, Response } from "express";
import { WeldingData } from "../models/weldingData";

export const dataRouter = Router();

/**
 * GET /api/data
 * Example query params:
 *   ?model=SuperWelder
 *   &currentMin=50
 *   &currentMax=100
 *   &voltageMin=10
 *   &voltageMax=20
 *   &startDate=2025-01-01
 *   &endDate=2025-01-31
 */
dataRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { model, currentMin, currentMax, voltageMin, voltageMax, startDate, endDate } =
      req.query as Record<string, string>;

    const filter: Record<string, any> = {};

    if (model) {
      filter["weldingMachine.model"] = model;
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

    const results = await WeldingData.find(filter);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching welding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/data
dataRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { timestamp, weldingMachine, weldingParameters, weldDurationMs } = req.body;

    const newWeldingData = new WeldingData({
      timestamp,
      weldingMachine,
      weldingParameters,
      weldDurationMs,
    });

    await newWeldingData.save();

    res.status(201).json(newWeldingData);
  } catch (error) {
    console.error("Error saving welding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
