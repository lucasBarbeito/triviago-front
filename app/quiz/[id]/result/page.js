import React from 'react';
import LoginPage from "../../../login/page";
import QuizComents from "../../../../components/QuizComents";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";

const ResultPage = () => {
    return (
        <div>
            <ResponsiveAppBar />
            <QuizComents />
        </div>
    );
};
export default ResultPage;
