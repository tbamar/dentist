import xior from 'xior';

export const http = xior.create({
	baseURL: '/api', // '/api'
	credentials: 'include',
});
