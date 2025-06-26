"use client";
import { ReactNode, useState } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "@/components/ui/context-menu";
import { AddOn } from "@/types/interface";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ContextMenuWrapperProps {
	children: ReactNode;
	// onEdit?: () => void;
	// onDelete?: () => void;
	// allowEdit?: boolean;
	// allowDelete?: boolean;
	addOns?: AddOn[]
	rowData?: any;
}


const ContextMenuWrapper: React.FC<ContextMenuWrapperProps> = ({
	children,
	// onEdit,
	// onDelete,
	// allowEdit = false,
	// allowDelete = false,
	addOns,
	rowData
}) => {

	if (!addOns) {
		return (
			<>{children}</>
		)
	}
	return (
		<>
			<ContextMenu modal={false}>
				<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
				<ContextMenuContent>
					{addOns && addOns.map(({ name, icon, onClick }, index) => {
						const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon ?? LucideIcons.Circle;
						return (
							<ContextMenuItem
								key={index}
								inset
								onClick={() => {
									if (onClick) {
										onClick(rowData); // Call onClick only if it's defined
									}
								}}
								className="text-xs w-auto cursor-pointer">
								{name}
								<ContextMenuShortcut>
									{icon && <Icon size={14} />}
								</ContextMenuShortcut>
							</ContextMenuItem>
						)
					})}
				</ContextMenuContent>
			</ContextMenu>
		</>
	);
};

export default ContextMenuWrapper;