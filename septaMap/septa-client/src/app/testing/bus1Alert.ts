import { Alert } from '../models/alert';

export const bus1Alert = new Alert();
bus1Alert.advisory_message = "<div class=\"fares_container\">\n\t\t\t\t <h3 class=\"separated\">69th St. Transportation Center Late Night Cleaning (Routes 101, 102, 104 & 109)<\/h3>\n\t\t\t\t <p class=\"desc separated\">Midnight - 4:00 a.m., Nightly<\/p>\n\t\t\t\t <p>The West Terminal will be closed for cleaning. Trolley Routes 101 and 102 and Bus Routes 104 and 109 will board from the following locations:<\/p>\n<p><strong>Routes 101 &amp; 102<\/strong> will arrive\/depart from the West Terminal Trolley platform (closest to Market St.) at: 12:10 a.m. (Route 102), 12:55 a.m. (Route 101), and 1:25 a.m. (Route 102)<\/p>\n<p><strong>Routes 104 &amp; 109<\/strong> will arrive\/depart from the South Terminal at: 12:40 a.m. (Route 104), 12:41 a.m., 1:45 a.m., 3:15 a.m., and 4:00 a.m. (Route 109)<\/p>\n<p><strong>We appreciate your patience while we complete this important maintenance work to improve this facility for our customers.<\/strong><\/p>\n\t\t\t <\/div>";
bus1Alert.route_id = "trolley_route_101";
bus1Alert.route_name = "101";
bus1Alert.current_message = "";
bus1Alert.detour_message = "";
bus1Alert.detour_start_location = "";
bus1Alert.detour_start_date_time = "";
bus1Alert.detour_end_date_time = "";
bus1Alert.detour_reason = "";
bus1Alert.last_updated = "Aug 23 2017 09:38:48:927PM";
bus1Alert.isSnow = "N";