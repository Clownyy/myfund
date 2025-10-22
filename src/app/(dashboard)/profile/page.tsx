"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemGroupList } from "@/components/item-group-list";
import { ItemGroupProps } from "@/types/interface";
import { Headphones, Key, Lamp, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react"

export default function ProfilePage() {
    const itemGroups: ItemGroupProps[] = [
        {
            icon: <User />,
            title: "My Profile",
            onClick: () => {
                console.log("User")
            }
        },
        {
            icon: <Key />,
            title: "Security & Privacy",
            onClick: () => {
                console.log("Change Password")
            }
        },
        {
            icon: <Settings />,
            title: "General Settings",
            onClick: () => {
                console.log("User")
            }
        },
        {
            icon: <Headphones />,
            title: "Customer Service",
            onClick: () => {
                console.log("User")
            }
        },
    ]
    return (
        <>
            <Card className="py-1">
                <CardContent>
                    <CardDescription>
                    </CardDescription>
                    <ItemGroupList data={itemGroups} />
                </CardContent>
            </Card>
            <Button variant="default" size={"lg"} className="w-full text-center mt-5" onClick={() => signOut()}>
                <span>Sign Out</span>
            </Button>
        </>
    )
}