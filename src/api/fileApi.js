import axiosClient from './axiosClient';

export const fileAPI = {
	async createFile(path, data = null, err) {
		const url = '/file';
		if (!data) {
			try {
				const response = await axiosClient.post(url, { path });
				return response;
			} catch (error) {
				err = error.response.data.message;
			}
		} else {
			try {
				const response = await axiosClient.post(url, { filePath: path, data });
				return response;
			} catch (error) {
				err = error.message;
			}
		}
	},

	async getFileContent(path) {
		const url = `/file?file_path=${path}`;
		try {
			const response = await axiosClient.get(url);
			return response.data;
		} catch (error) {
			return error;
		}
	},
};
