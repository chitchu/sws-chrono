import { Chrono, TimelineItem } from 'react-chrono';
import { useQuery, QueryStatus } from 'react-query';
import { format } from 'date-fns';

export interface Root {
  data: Daum[]
  meta: Meta
}

export interface Daum {
  date: number
  events: Events
}

export interface Events {
  data: Daum2[]
}

export interface Daum2 {
  company_id: string
  id: number
  priority: boolean
  types: Types
}

export interface Types {
  data: Daum3[]
}

export interface Daum3 {
  id: number
  name: string
  shortName: string
  group: string
}

export interface Meta {
  limit: number
  offset: number
  total: number
}

/**
 * active?: boolean;
    cardDetailedText?: string;
    cardSubtitle?: string;
    cardTitle?: string;
    id?: string;
    media?: Media;
    position?: string;
    title?: string;
    visible?: boolean;
 */

export default function Index() {
  const response = useQuery('events', async () => {
    const raw = await fetch('https://api.simplywall.st/api/company/developments/NasdaqGS:AAPL?start_timestamp=1447290900000&limit=1000&event_type_ids[89]=1&event_type_ids[90]=1&event_type_ids[12]=1&event_type_ids[153]=1&event_type_ids[91]=1&event_type_ids[7]=1&event_type_ids[155]=1&event_type_ids[154]=1&event_type_ids[74]=1&event_type_ids[59]=1&event_type_ids[224]=1&event_type_ids[25]=1&event_type_ids[24]=1&event_type_ids[76]=1&event_type_ids[207]=1&event_type_ids[85]=1&event_type_ids[86]=1&event_type_ids[99]=1&event_type_ids[206]=1&event_type_ids[205]=1&event_type_ids[21]=1&event_type_ids[101]=1&event_type_ids[80]=1&event_type_ids[44]=1&event_type_ids[137]=1&event_type_ids[31]=1&event_type_ids[32]=1&event_type_ids[73]=1&event_type_ids[61]=1&event_type_ids[28]=1&event_type_ids[226]=1&event_type_ids[82]=1&event_type_ids[26]=1&event_type_ids[225]=1&event_type_ids[27]=1&event_type_ids[29]=1&event_type_ids[53]=1&event_type_ids[213]=1&event_type_ids[47]=1&event_type_ids[214]=1&event_type_ids[46]=1&event_type_ids[94]=1&event_type_ids[54]=1&event_type_ids[232]=1&event_type_ids[233]=1&event_type_ids[230]=1&event_type_ids[157]=1&event_type_ids[160]=1&event_type_ids[92]=1&event_type_ids[102]=1&event_type_ids[16]=1&event_type_ids[42]=1&event_type_ids[83]=1&event_type_ids[11]=1&event_type_ids[62]=1&event_type_ids[77]=1&event_type_ids[97]=1&event_type_ids[43]=1&event_type_ids[194]=1&event_type_ids[75]=1&event_type_ids[95]=1&event_type_ids[57]=1&event_type_ids[93]=1&event_type_ids[150]=1&event_type_ids[41]=1&event_type_ids[22]=1&event_type_ids[215]=1&event_type_ids[36]=1&event_type_ids[78]=1&event_type_ids[56]=1&event_type_ids[58]=1&event_type_ids[79]=1&event_type_ids[88]=1&event_type_ids[135]=1&event_type_ids[156]=1&event_type_ids[163]=1&event_type_ids[164]=1&event_type_ids[172]=1&event_type_ids[177]=1&event_type_ids[187]=1&event_type_ids[65]=1&event_type_ids[3]=1&event_type_ids[1]=1&event_type_ids[63]=1&event_type_ids[152]=1&event_type_ids[5]=1&event_type_ids[64]=1&event_type_ids[100]=1')
    const response = await raw.json() as Root;
    return response.data.map<TimelineItem>(item => {

      return {
        cardTitle: format(item.date, 'MMM dd, yyyy'),
        cardDetailedText: item.events.data.map(event => {
          const [type] = event.types.data;
          return type.name;
        }).join(',')
        // cardSubtitle:
      }
      // return {
      //   date: format(item.date, 'MMM dd, yyyy'),
      //   events: item.events.data.map(event => {
      //     const [type] = event.types.data;
      //     return { name: type.name, id: type.id };
      //   })
      // }
    })
  });



  return <div>
    {
      response.status === QueryStatus.Success && <Chrono
        hideControls
        scrollable
        items={response.data}
        mode="VERTICAL_ALTERNATING"
      />
    }

  </div>
}
