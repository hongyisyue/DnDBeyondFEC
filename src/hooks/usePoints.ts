import { useEffect, useState } from "react";

export default function usePoints(initialPoint: number) {
    const [points, setPoints] = useState(initialPoint);

    useEffect(() => {
        if (points <= 0) {
            
        }
    }, [points])
}