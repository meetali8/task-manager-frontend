import { TaskProps } from '@/constants/commonInterfaces';
import axios from 'axios';

export async function postRequest(URL: string, payload?: TaskProps) {
	const data = await axios.post(`${URL}`, payload);
	return data.data;
}

export async function getRequest(URL: string) {
	const data = await axios.get(`${URL}`);
	return data.data;
}

export async function deleteRequest(URL: string, id: number) {
	const data = await axios.delete(`${URL}/${id}`);
	return data.data;
}