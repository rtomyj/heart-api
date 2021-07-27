import Status from './Status'
import YouTubeChannelActivity from './YouTubeChannelActivity'
import { Express } from 'express'
import YouTubeVideoInfo from './YouTubeVideoInfo'
import YouTubeGiveAway from './YouTubeGiveAway'

export default class Routes {
	static BASE_URI = '/v1'

	static setupRoutes(app: Express): void {
		app.use(Routes.BASE_URI, new Status().router)
		app.use(Routes.BASE_URI, new YouTubeChannelActivity().router)
		app.use(Routes.BASE_URI, new YouTubeVideoInfo().router)
		app.use(Routes.BASE_URI, new YouTubeGiveAway().router)
	}
}