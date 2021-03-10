import {controller, httpGet} from "inversify-express-utils";

@controller('/api/monitor')
export class StatusController {

    @httpGet('/ping')
    public ping(): string {
        return '';
    }

}