import Login from "./login/page";
import { Suspense } from "react";

export default function Home() {
    return (
        <Suspense>
            <Login />
        </Suspense>
    );
}
