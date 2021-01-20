import {
    getThisTest
} from "../models/test.model";

export const getTest = async (req, res) => {
    const test = await getThisTest();
    console.log(test);

    res.json(test);
}