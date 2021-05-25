import React from "react";

export default function HomePage() {

    return (
        <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, ,2, 2, 2, 2, 2].map(() => (
                <h1 className={"h-16"}>
                    Ladig
                </h1>
            ))}
        </div>
    )
}
