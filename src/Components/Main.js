import PlayAgainstHuman from './PlayAgainstHuman';
import PlayAgainstAI from './PlayAgainstAI';
import NavigationBar from './NavigationBar';
import { Routes, Route, Navigate } from 'react-router-dom'

export const Main = () => {
    return (
        <>
            <NavigationBar />
            <div className="container">
                <Routes>
                    <Route path="/vsHuman" element={<PlayAgainstHuman />} />
                    <Route path="/vsComputer" element={<PlayAgainstAI />} />
                    <Route path="*" element={<Navigate to="/vsComputer" />} />
                </Routes>
            </div>
        </>
    );
}