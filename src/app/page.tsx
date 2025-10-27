import Login from "./login/page";
import { Suspense } from "react";

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Login />
        </Suspense>
    );
}
