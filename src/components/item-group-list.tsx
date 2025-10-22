import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
} from "@/components/ui/item"
import { ItemGroupProps } from "@/types/interface"

export function ItemGroupList({ data }: { data: ItemGroupProps[] }) {
    return (
        <div>
            <ItemGroup>
                {data.map((item, index) => (
                    <React.Fragment key={item.title}>
                        <Item size={"sm"} className="py-2 px-0">
                            <Button variant="ghost" className="w-full text-left px-0" onClick={item.onClick}>
                                <ItemMedia>
                                    {item.icon}
                                </ItemMedia>
                                <ItemContent className="gap-1">
                                    {item.title}
                                </ItemContent>
                                <ItemActions>
                                    <ChevronRight />
                                </ItemActions>
                            </Button>
                        </Item>
                        {index !== data.length - 1 && <ItemSeparator />}
                    </React.Fragment>
                ))}
            </ItemGroup>
        </div>
    )
}
