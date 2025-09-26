import { format, parse } from 'date-fns';
import { de } from 'date-fns/locale';
import { convertFloatToTimeString } from '../lib/date';
import packageJson from '../../package.json';
import config from '../config/config';

declare global {
  interface Window {
    pdfMake: any;
  }
}

interface WorkingTime {
  id?: number;
  startAt: string;
  endAt: string;
  breakTime: number;
  note?: string;
}

interface Day {
  date: string;
  isWorkingDay: boolean;
  workingTimes?: WorkingTime[];
  vacationItem?: any;
  illnessItem?: any;
  breakfastItem?: any;
  lunchItem?: any;
  isHours?: number;
}

interface MonthResult {
  targetHours: string;
  isHours: string;
  breakfastCount: number;
  lunchCount: number;
  illnessCount: number;
  vacationCount: number;
  difference: string;
}

interface MonthData {
  days: Day[];
  result: MonthResult;
}

const tableLayoutWithXPadding = {
  hLineWidth: (i: number, node: any) =>
    i === 0 || i === node.table.body.length ? 1 : 0.5,
  vLineWidth: () => 0,
  hLineColor: () => '#aaa',
  paddingLeft: () => 4, // x padding left
  paddingRight: () => 4, // x padding right
  paddingTop: () => 2,
  paddingBottom: () => 2,
};

function sanitizeFilename(input: string): string {
  return input
    .trim()
    .replace(/[\s]+/g, '_')
    .replace(/[^a-zA-Z0-9_\-\.]/g, '_');
}

export const generateMonthPdf = (
  userData: any,
  data: MonthData,
  month: number,
  year: number,
) => {
  const content: any[] = [];

  content.push({
    text: `${userData.firstname} ${userData.lastname}`,
    style: 'header',
    margin: [0, 0, 0, 4],
  });

  content.push({
    text: parse(`${year}-${month}`, 'yyyy-M', new Date()).toLocaleString(
      'de-DE',
      { month: 'long', year: 'numeric' },
    ),
    style: 'header',
    margin: [0, 0, 0, 10],
  });

  const tableBody: any[][] = [
    [
      { text: 'Datum', style: 'tableHeader' },
      { text: 'Tätigkeit', style: 'tableHeader' },
      { text: 'Arbeitszeit', style: 'tableHeader' },
      { text: 'Urlaub', style: 'tableHeader' },
      { text: 'Krank', style: 'tableHeader' },
      { text: 'Frühstück', style: 'tableHeader' },
      { text: 'Mittagessen', style: 'tableHeader' },
    ],
  ];

  data.days.forEach((day) => {
    const dateLabel = format(new Date(day.date), 'EEE dd.MM.', { locale: de });
    const workTimes = (day.workingTimes || [])
      .map((w) => {
        const start = w.startAt ? format(new Date(w.startAt), 'HH:mm') : '';
        const end = w.endAt ? format(new Date(w.endAt), 'HH:mm') : '';
        const breakTime =
          typeof w.breakTime === 'number'
            ? `${Math.floor(w.breakTime)}h${Math.round((w.breakTime % 1) * 60)}m`
            : '';
        return `${start} - ${end} ${w.breakTime > 0 ? ` - Pause ${breakTime}` : ''} ${w.note || ''}`.trim();
      })
      .join('\n');

    const isWeekend = [0, 6].includes(new Date(day.date).getDay());
    const weekendStyle = isWeekend ? { fillColor: '#f0f0f0' } : {};

    tableBody.push([
      { text: dateLabel, ...weekendStyle },
      { text: workTimes || '', ...weekendStyle },
      {
        text: convertFloatToTimeString(day.isHours || 0) || '',
        ...weekendStyle,
      },
      { text: day.vacationItem ? 'X' : '', ...weekendStyle },
      { text: day.illnessItem ? 'X' : '', ...weekendStyle },
      { text: day.breakfastItem ? 'X' : '', ...weekendStyle },
      { text: day.lunchItem ? 'X' : '', ...weekendStyle },
    ]);
  });

  content.push({
    table: {
      headerRows: 1,
      widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
      body: tableBody,
    },
    layout: tableLayoutWithXPadding,
  });

  const result = data.result;
  content.push({
    text: 'Zusammenfassung',
    style: 'subheader',
    margin: [0, 20, 0, 5],
  });

  content.push({
    table: {
      widths: ['*', '*', '*', '*', '*', '*', '*'],
      body: [
        [
          'SOLL Stunden',
          'IST Stunden',
          'Frühstück',
          'Mittagessen',
          'Krank',
          'Urlaub',
          'Differenz',
        ],
        [
          convertFloatToTimeString(result.targetHours),
          convertFloatToTimeString(result.isHours),
          result.breakfastCount,
          result.lunchCount,
          result.illnessCount,
          result.vacationCount,
          convertFloatToTimeString(result.difference),
        ],
      ],
    },
    layout: tableLayoutWithXPadding,
  });

  const docDefinition = {
    content,
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 14, bold: true },
      tableHeader: { bold: true, fillColor: '#eeeeee' },
    },
    defaultStyle: {
      fontSize: 10,
    },
    footer: (currentPage: number, pageCount: number) => {
      const formattedDate = format(new Date(), 'dd.MM.yyyy HH:mm');
      return {
        columns: [
          {
            text: `Erstellt am ${formattedDate}`,
            alignment: 'left',
            color: 'gray',
            fontSize: 8,
          },
          {
            text: `Seite ${currentPage} von ${pageCount}`,
            alignment: 'center',
            color: 'gray',
            fontSize: 8,
          },
          {
            text: `${config.REACT_APP_TITLE} v${packageJson.version}`,
            alignment: 'right',
            color: 'gray',
            fontSize: 8,
          },
        ],
        margin: [30, 10],
      };
    },
  };

  window.pdfMake
    .createPdf(docDefinition)
    .download(
      `${sanitizeFilename(`${userData.lastname}_${userData.firstname}_${format(parse(`${year}-${month}`, 'yyyy-M', new Date()), 'yyyy_MM')}`)}.pdf`,
    );
};
