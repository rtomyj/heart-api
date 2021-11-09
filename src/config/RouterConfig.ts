import { Express } from 'express'
import validateJWTMiddleware from '@middleware/JWTAuthentication'
import youTubeGiveAwayControllerCB from '@controller/YouTubeGiveAwayController'
import youTubeChannelActivityControllerCB from '@controller/YouTubeUploadsController'
import youTubeVideoInfoControllerCB from '@controller/YouTubeVideoInfoController'
import statusControllerCB from '@controller/StatusController'
import { createJwtControllerCB } from '@controller/JWTController'
import { addCommunicationForService, getCommunicationForService } from '@controller/NewsController'
import apiKeyAuthenticationMiddleware from '@middleware/APIKeyAuthentication'

export default class Routes {
	static BASE_URI = '/api/v1'
	static YT_FUNCTIONALITY_BASE_URI = `${Routes.BASE_URI}/yt`

	/**
	 * Configures Express API to open up routes using Router objects.
	 * Each Router object should specify endpoints and HTTP methods each endpoint supports.
	 * @param app reference to Express API object that will be modified.
	 */
	static setupRoutes(app: Express): void {
		app.get(`${Routes.BASE_URI}/status`, statusControllerCB)
		app.get(`${Routes.YT_FUNCTIONALITY_BASE_URI}/channel/uploads`, youTubeChannelActivityControllerCB)
		app.get(`${Routes.YT_FUNCTIONALITY_BASE_URI}/video/info`, validateJWTMiddleware, youTubeVideoInfoControllerCB)
		app.get(`${Routes.YT_FUNCTIONALITY_BASE_URI}/video/giveaway`, validateJWTMiddleware, youTubeGiveAwayControllerCB)
		app.get(`${Routes.BASE_URI}/auth/jwt`, apiKeyAuthenticationMiddleware,  createJwtControllerCB)

		app.get(`${Routes.BASE_URI}/news`, getCommunicationForService)
		app.put(`${Routes.BASE_URI}/news`, validateJWTMiddleware, addCommunicationForService)
	}
}