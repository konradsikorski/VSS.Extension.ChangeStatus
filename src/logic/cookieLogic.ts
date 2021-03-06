import { ITemplate } from "./templates/core";

export class CookieLogic { 
    public static saveProjectTemplate(projectId: string, template: ITemplate, daysToExpire: number = 30) {
        let expiration = CookieLogic.calculateExpirationDate(daysToExpire);
        document.cookie = `${projectId}=${JSON.stringify(template)}; expires=${expiration.toGMTString()}`;
        console.log('Project template saved in cookie');
    }

    public static getProjectTemplate(projectId: string) : ITemplate{
        var reg = new RegExp('(?:(?:^|.*;\\s*)' + projectId + '\\s*\\=\\s*([^;]*).*$)|^.*$', 'g')
        var cookieValue = document.cookie.replace(reg, "$1");

        return cookieValue ? JSON.parse(cookieValue) : undefined;
    }

    private static calculateExpirationDate(days: number): Date{
        var date = new Date();
        date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000

        return date;
    }
}