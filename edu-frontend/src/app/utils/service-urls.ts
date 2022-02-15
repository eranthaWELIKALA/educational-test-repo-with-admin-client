import { environment } from "src/environments/environment"

export class ServiceUrls {
    private static servicePrefix = environment.USER_SERVICE_URL;

    public static LOGIN_USER = ServiceUrls.servicePrefix + "/token";
    public static GROUPS = ServiceUrls.servicePrefix + "/group";
    public static GROUP_MEMBERS = ServiceUrls.servicePrefix + "/group-members";
    public static STUDENTS = ServiceUrls.servicePrefix + "/student";
    public static TEACHERS = ServiceUrls.servicePrefix + "/teacher";
}