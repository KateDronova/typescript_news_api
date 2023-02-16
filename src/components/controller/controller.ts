import { Data } from '../view/appView';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data?: Data) => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback,
        );
    }

    // getNews(e: Event, callback) {
    getNews(e: Event, callback: (data?: Data) => void) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (newsContainer && target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId === null) {
                    return;
                }
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
