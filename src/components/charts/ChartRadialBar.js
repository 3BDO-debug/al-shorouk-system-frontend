import _, { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
// utils
import { fNumber } from '../../utils/formatNumber';
//
import BaseOptionChart from './BaseOptionChart';

// ----------------------------------------------------------------------

ChartRadialBar.propTypes = {
  labelsData: PropTypes.array,
  chartData: PropTypes.array
};

export default function ChartRadialBar({ labelsData, chartData }) {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    labels: labelsData,
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.primary.light },
            { offset: 100, color: theme.palette.primary.main }
          ],
          [
            { offset: 0, color: theme.palette.warning.light },
            { offset: 100, color: theme.palette.warning.main }
          ]
        ]
      }
    },
    legend: { horizontalAlign: 'center' },
    plotOptions: {
      radialBar: {
        hollow: { size: '68%' },
        dataLabels: {
          value: { offsetY: 16 },
          total: {
            formatter() {
              return fNumber(_.sum(chartData));
            }
          }
        }
      }
    }
  });

  return <ReactApexChart type="radialBar" series={chartData} options={chartOptions} height={400} />;
}
