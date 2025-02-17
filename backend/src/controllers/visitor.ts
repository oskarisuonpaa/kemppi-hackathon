import { Router, Request, Response } from "express";
import { WeldingData } from "../models/weldingData";
import { totalWeldsLastWeek, mostUsedWeldingMachine, totalWireConsumed, averageWeldDuration } from "../utils/dataHelper";

export const visitorRouter = Router();

visitorRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const results = await WeldingData.find({});
        const lastWeeksWelds = totalWeldsLastWeek(results);
        const mostUsedMachine = mostUsedWeldingMachine(results);
        const totalWire = totalWireConsumed(results);
        const avgDuration = averageWeldDuration(results);

        res.json({
            lastWeeksWelds,
            mostUsedMachine,
            totalWire,
            avgDuration,
        });
    } catch (error) {
        console.error("Error fetching welding data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
    
});
