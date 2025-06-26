"use client";

import { httpRequest } from "@/lib/httpRequest";
import { HttpMethod } from "@/types/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const getData = (queryKey: string, api: string) => {
	return useQuery({
		queryKey: [queryKey],
		queryFn: () => httpRequest(process.env.NEXT_PUBLIC_API_BASE_URL!, api, "GET"),
	});
};

export const postData = (queryKey: string, api: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: any) =>
			httpRequest(process.env.NEXT_PUBLIC_API_BASE_URL!, api, "POST", data),
		onSuccess: () => {
			toast.success("Data Added Successfully");
			queryClient.invalidateQueries({ queryKey: [queryKey] });
		},
		onError: (error: any) => {
			console.log(error);
			toast.error(
				"An error has occurred: ",
				error.message && "Something went wrong"
			);
		},
	});
};

export const putData = (queryKey: string, api: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: any) =>
			httpRequest(
				process.env.NEXT_PUBLIC_API_BASE_URL!,
				`${api}/${data.id}`,
				"PUT",
				data
			),
		onSuccess: () => {
			toast.success("Data Updated Successfully");
			queryClient.invalidateQueries({ queryKey: [queryKey] });
		},
		onError: (error: any) => {
			console.log(error);
			toast.error(
				"An error has occurred: ",
				error.message && "Something went wrong"
			);
		},
	});
};

export const patchData = (queryKey: string, api: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: any) =>
			httpRequest(
				process.env.NEXT_PUBLIC_API_BASE_URL!,
				`${api}/${data.id}`,
				"PATCH",
				data
			),
		onSuccess: () => {
			toast.success("Data Updated Successfully");
			queryClient.invalidateQueries({ queryKey: [queryKey] });
		},
		onError: (error: any) => {
			console.log(error);
			toast.error(
				"An error has occurred: ",
				error.message && "Something went wrong"
			);
		},
	});
};

export const deleteData = (queryKey: string, api: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: any) =>
			httpRequest(process.env.NEXT_PUBLIC_API_BASE_URL!, api, "DELETE", data),
		onSuccess: () => {
			toast.success("Data Deleted Successfully");
			queryClient.invalidateQueries({ queryKey: [queryKey] });
		},
		onError: (error: any) => {
			console.log(error);
			toast.error(
				"An error has occurred: ",
				error.message && "Something went wrong"
			);
		},
	});
};

const methods: Record<HttpMethod, (queryKey: string, api: string) => any> = {
	GET: getData,
	POST: postData,
	PUT: putData,
	PATCH: patchData,
	DELETE: deleteData,
};

export const useQueryApi = (api: string, queryKey: string, method: HttpMethod) => {
	const handler = methods[method];
	return handler(queryKey, api);
};