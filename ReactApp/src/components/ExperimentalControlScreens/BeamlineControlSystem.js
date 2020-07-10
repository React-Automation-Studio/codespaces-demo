import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import HarpRangeSelection from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpRangeSelection';
import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';

import EditorSinglePS from '../ExperimentalControlScreens/GridComponents/EditorSinglePS'
import EditorSlitXY from '../ExperimentalControlScreens/GridComponents/EditorSlitXY'
import EditorSteererXY from '../ExperimentalControlScreens/GridComponents/EditorSteererXY'
import { BottomNavigationAction } from '@material-ui/core';
import HarpGraph from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpGraph';
import AppBar from '@material-ui/core/AppBar';
import GraphY from '../BaseComponents/GraphY';
import ControlTable from '../ExperimentalControlScreens/GridComponents/ControlTable'
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout.js';
import BeamLineCanvas from '../SvgBeamlineComponents/BeamLineCanvas';
import HorizontalBeamline from '../SvgBeamlineComponents/HorizontalBeamline';
import QuadrapoleMagnet from '../SvgBeamlineComponents/QuadrapoleMagnet';
import BendingMagnet from '../SvgBeamlineComponents/BendingMagnet';
import SteererYMagnet from '../SvgBeamlineComponents/SteererYMagnet';
import SteererXYMagnet from '../SvgBeamlineComponents/SteererXYMagnet';
import SlitXY from '../SvgBeamlineComponents/SlitXY';
import Harp from '../SvgBeamlineComponents/Harp';
import FC from '../SvgBeamlineComponents/FC';
import PV from '../SystemComponents/PV'

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column'
  },
  indicator: {
    display: 'none',
  }
}))(Tabs)
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1) * 2
  },
  paper: {
    padding: theme.spacing(1) * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 0, ...props.style }}>
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
const BeamlineControlSystem = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const [sideTabValue, setSideTabValue] = useState(0);
  const [editorType, setEditorType] = useState("");
  const [displayEditor, setDisplayEditor] = useState(false);
  const [editorSystem, setEditorSystem] = useState({});
  const [displayHarps, setDisplayHarps] = useState(
    [
      { systemName: 'testIOC:Harp1', displayName: 'Harp 1', inserted: false },
      { systemName: 'testIOC:Harp2', displayName: 'Harp 2', inserted: false },
      { systemName: 'testIOC:Harp3', displayName: 'Harp 3', inserted: false },
      { systemName: 'testIOC:Harp4', displayName: 'Harp 4', inserted: false },
    ]);
  const [maxHarpsReached, setMaxHarpsReached] = useState(false);
  const [x0GraphPVs, setX0GraphPVs] = useState([]);
  const [y0GraphPVs, setY0GraphPVs] = useState([]);
  const [x0legend, setX0legend] = useState([]);
  const [y0legend, setY0legend] = useState([]);
  const [x0GraphKey, setX0GraphKey] = useState("");
  const [onlyY0, setOnlyY0] = useState(false);
  const [onlyX0, setOnlyX0] = useState(false);
  const [x1GraphPVs, setX1GraphPVs] = useState([]);
  const [y1GraphPVs, setY1GraphPVs] = useState([]);
  const [x1legend, setX1legend] = useState([]);
  const [y1legend, setY1legend] = useState([]);
  const [x1GraphKey, setX1GraphKey] = useState("");
  const [onlyY1, setOnlyY1] = useState(false);
  const [onlyX1, setOnlyX1] = useState(false);
  const [topXgraphYmax, setTopXgraphYmax] = useState(0); ///
  const [topYgraphYmax, setTopYgraphYmax] = useState(0); ///
  const [bottomYgraphYmax, setBottomYgraphYmax] = useState(0);
  const [bottomXgraphYmax, setBottomXgraphYmax] = useState(0);
  const [x0SystemName, setX0SystemName] = useState(null)
  const [x1SystemName, setX1SystemName] = useState(null)
  const [x0RangePV, setX0RangePV] = useState(undefined)
  const [x1RangePV, setX1RangePV] = useState(undefined)
  const [y0RangePV, setY0RangePV] = useState(undefined)
  const [y1RangePV, setY1RangePV] = useState(undefined)
  const [y0GraphKey, setY0GraphKey] = useState(null)
  const [y1GraphKey, setY1GraphKey] = useState(null)
  const yOffset = 0;
  const handleTabChange = (event, value) => {
    setTabValue(value)
  };
  const handleOnSystemClick = (system) => {
    setEditorType(system.editorType)
    setDisplayEditor(true)
    setEditorSystem(system)
  }
  const harps = [];

  const systems = {
    'BeamLine': {
      'PowerSupplies': {
        'Q1': {
          systemName: '$(IOC):$(device)',
          displayName: 'Q1',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):Setpoint',
          readbackPv: '$(IOC):$(device):Readback',
          onOffPv: '$(IOC):$(device):On',
          statusTextPv: '$(IOC):$(device):On',
          scanPv: '$(IOC):$(device):SimReadback.SCAN',
          orocPv: '$(IOC):$(device):SimReadback.OROC',
          rampRatePv: '$(IOC):$(device):RampRate',
          macros:
          {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'PS1',
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 100,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'Q2': {
          systemName: '$(IOC):$(device)',
          displayName: 'Q2',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):Setpoint',
          readbackPv: '$(IOC):$(device):Readback',
          onOffPv: '$(IOC):$(device):On',
          statusTextPv: '$(IOC):$(device):On',
          scanPv: '$(IOC):$(device):SimReadback.SCAN',
          orocPv: '$(IOC):$(device):SimReadback.OROC',
          rampRatePv: '$(IOC):$(device):RampRate',
          macros:
          {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'PS2',
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 250,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'Q3': {
          systemName: '$(IOC):$(device)',
          displayName: 'Q3',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):Setpoint',
          readbackPv: '$(IOC):$(device):Readback',
          onOffPv: '$(IOC):$(device):On',
          statusTextPv: '$(IOC):$(device):On',
          scanPv: '$(IOC):$(device):SimReadback.SCAN',
          orocPv: '$(IOC):$(device):SimReadback.OROC',
          rampRatePv: '$(IOC):$(device):RampRate',
          macros:
          {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'PS3',
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 450,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'BM1': {
          systemName: '$(IOC):$(device)',
          displayName: 'BM1',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):Setpoint',
          readbackPv: '$(IOC):$(device):Readback',
          onOffPv: '$(IOC):$(device):On',
          statusTextPv: '$(IOC):$(device):On',
          scanPv: '$(IOC):$(device):SimReadback.SCAN',
          orocPv: '$(IOC):$(device):SimReadback.OROC',
          rampRatePv: '$(IOC):$(device):RampRate',
          macros:
          {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'PS4',
          },
          svgProps: {
            usePvUnits: true,
            alarmSensitive: true,
            componentShadow: true,
            textShadow: false,
            componentGradient: true,
            x: 600,
            y: yOffset,
            prec: 3,
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'STR1XY': {
          componentType: 'SteererXYMagnet',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)XY',
          editorType: 'editorSteererXY',
          ySetpointPv: '$(IOC):$(device):Y:Setpoint',
          yReadbackPv: '$(IOC):$(device):Y:Readback',
          yOnPv: '$(IOC):$(device):Y:On',
          xSetpointPv: '$(IOC):$(device):X:Setpoint',
          xReadbackPv: '$(IOC):$(device):X:Readback',
          xOnPv: '$(IOC):$(device):X:On',
          //scanPv: '$(IOC):$(device):SimReadback.SCAN',
          //orocPv: '$(IOC):$(device):SimReadback.OROC',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'STR1',
          },
          svgProps: {
            x: 785, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true,
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'STR2XY': {
          componentType: 'SteererXYMagnet',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)XY',
          editorType: 'editorSteererXY',
          ySetpointPv: '$(IOC):$(device):Y:Setpoint',
          yReadbackPv: '$(IOC):$(device):Y:Readback',
          yOnPv: '$(IOC):$(device):Y:On',
          xSetpointPv: '$(IOC):$(device):X:Setpoint',
          xReadbackPv: '$(IOC):$(device):X:Readback',
          xOnPv: '$(IOC):$(device):X:On',
          //scanPv: '$(IOC):$(device):SimReadback.SCAN',
          //orocPv: '$(IOC):$(device):SimReadback.OROC',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'STR2',
          },
          svgProps: {
            x: 800, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true,
            valueOffsetY: 30,
            labelOffsetY: -15
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'STR2': {
          componentType: 'SteererYMagnet',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)$(XorY)',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):$(XorY):Setpoint',
          readbackPv: '$(IOC):$(device):$(XorY):Readback',
          statusTextPv: '$(IOC):$(device):$(XorY):On',
          statusOnPv: '$(IOC):$(device):$(XorY):On',
          //scanPv: '$(IOC):$(device):SimReadback.SCAN',
          //orocPv: '$(IOC):$(device):SimReadback.OROC',
          onOffPv: '$(IOC):$(device):$(XorY):On',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'STR2',
            '$(XorY)': 'Y'
          },
          svgProps: {
            x: 1100, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        },
        'STR3': {
          componentType: 'SteererYMagnet',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)$(XorY)',
          editorType: 'editorSinglePS',
          setpointPv: '$(IOC):$(device):$(XorY):Setpoint',
          readbackPv: '$(IOC):$(device):$(XorY):Readback',
          statusTextPv: '$(IOC):$(device):$(XorY):On',
          //scanPv: '$(IOC):$(device):SimReadback.SCAN',
          //orocPv: '$(IOC):$(device):SimReadback.OROC',
          onOffPv: '$(IOC):$(device):$(XorY):On',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'STR3',
            '$(XorY)': 'Y'
          },
          svgProps: {
            x: 1200, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true
          },
          tableProps: {
            prec: 3, units: "A", useStatus: true
          },
        }
      },
      'Slits': {
        'SLITXY1': {
          componentType: 'SlitXY',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)',
          editorType: 'editorSlitXY',
          xDriveOnPv: '$(IOC):$(device):X:Drive:On',
          yDriveOnPv: '$(IOC):$(device):Y:Drive:On',
          xGapReadbackPv: '$(IOC):$(device):X:Gap:Readback',
          yGapReadbackPv: '$(IOC):$(device):Y:Gap:Readback',
          xOffsetReadbackPv: '$(IOC):$(device):X:Offset:Readback',
          yOffsetReadbackPv: '$(IOC):$(device):Y:Offset:Readback',
          xGapSetpointPv: '$(IOC):$(device):X:Gap:Setpoint',
          yGapSetpointPv: '$(IOC):$(device):Y:Gap:Setpoint',
          xOffsetSetpointPv: '$(IOC):$(device):X:Offset:Setpoint',
          yOffsetSetpointPv: '$(IOC):$(device):Y:Offset:Setpoint',
          label: '$(device)',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'SLITXY1',
          },
          svgProps: {
            x: 900, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true
          },
          tableProps: {
            prec: 1, units: "mm", useStatus: true
          },
        },
        'SLITXY2': {
          componentType: 'SlitXY',
          systemName: '$(IOC):$(device)',
          displayName: '$(device)',
          editorType: 'editorSlitXY',
          xDriveOnPv: '$(IOC):$(device):X:Drive:On',
          yDriveOnPv: '$(IOC):$(device):Y:Drive:On',
          xGapReadbackPv: '$(IOC):$(device):X:Gap:Readback',
          yGapReadbackPv: '$(IOC):$(device):Y:Gap:Readback',
          xOffsetReadbackPv: '$(IOC):$(device):X:Offset:Readback',
          yOffsetReadbackPv: '$(IOC):$(device):Y:Offset:Readback',
          xGapSetpointPv: '$(IOC):$(device):X:Gap:Setpoint',
          yGapSetpointPv: '$(IOC):$(device):Y:Gap:Setpoint',
          xOffsetSetpointPv: '$(IOC):$(device):X:Offset:Setpoint',
          yOffsetSetpointPv: '$(IOC):$(device):Y:Offset:Setpoint',
          label: '$(device)',
          macros: {
            '$(IOC)': 'pva://testIOC',
            '$(device)': 'SLITXY2',
          },
          svgProps: {
            x: 1280, y: yOffset,
            usePvUnits: true, prec: 1, alarmSensitive: true,
            labelOffsetY: 0, labelOffsetX: 0, valueOffsetY: 0, valueOffsetX: 0,
            componentShadow: true, textShadow: false, componentGradient: true
          },
          tableProps: {
            prec: 1, units: "mm", useStatus: true
          },
        },
      },
      Harps: {
        Harp1: {
          maxHarpsReached: maxHarpsReached,
          x: 140,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: 'pva://$(IOC):$(actuatorName):put-outIn',
          isMovingPv: 'pva://$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: '$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp1',
          }
        },
        Harp2: {
          maxHarpsReached: maxHarpsReached,
          x: 295,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: 'pva://$(IOC):$(actuatorName):put-outIn',
          isMovingPv: 'pva://$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: '$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp2',
          }
        },
        Harp3: {
          maxHarpsReached: maxHarpsReached,
          x: 495,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: 'pva://$(IOC):$(actuatorName):put-outIn',
          isMovingPv: 'pva://$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: '$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp3',
          }
        },
        Harp4: {
          maxHarpsReached: maxHarpsReached,
          x: 1150,
          y: yOffset,
          alarmSensitive: true,
          textShadow: false,
          componentGradient: true,
          pv: 'pva://$(IOC):$(actuatorName):put-outIn',
          isMovingPv: 'pva://$(IOC):$(actuatorName):get-status.B5',
          inLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B6',
          outLimitPv: 'pva://$(IOC):$(actuatorName):get-status.B7',
          inLimitValue: 1,
          outLimitValue: 1,
          isMovingValue: 1,
          label: '$(actuatorName)',
          macros: {
            '$(IOC)': 'testIOC',
            '$(actuatorName)': 'Harp4',
          }
        }

      }
    }
  }
  const allSystems = { ...systems.BeamLine.PowerSupplies, ...systems.BeamLine.Slits }
  const [harpPvs, setHarpPvs] = useState({});
  const harpPvConnections = (harpSystems) => {
    let pvs = [];
    let index = 0;
    for (let harp in harpSystems) {
      // console.log(harp)
      pvs.push(
        <PV
        //debug={true}
          key={index.toString()}
          pv={harpSystems[harp].inLimitPv}
          macros={harpSystems[harp].macros}
          pvData={(pv) => setHarpPvs(prePvs => {
            let pvs = {...prePvs}
            // if you want modify the  pv data do it here!
            pvs[harp] = pv;
            return pvs

          }
          )}
        />)
      index++;
    }

    return pvs
  }
  useEffect(()=>{
    let harp;
    let numberOfInsertedHarps=0;
    for(harp in harpPvs ){
     
      if(harpPvs[harp]){
        //console.log(harp,harpPvs[harp])
        if (harpPvs[harp].value==1){
          numberOfInsertedHarps++;
        }
      }
    }
    if (numberOfInsertedHarps>=2){
      setMaxHarpsReached(true);
    }
    else{
      setMaxHarpsReached(false);
    }
  },[harpPvs])
  const handleHarpInsertedOrRemoved = (inserted, name) => {
    let harp;
    let x0GraphPVs = [];
    let y0GraphPVs = [];
    let x0legend = [];
    let y0legend = [];
    let x0GraphKey = "x0Graph";
    let y0GraphKey = "y0Graph";
    let x1GraphPVs = [];
    let y1GraphPVs = [];
    let x0SystemName;
    let x1SystemName;
    let x0RangePV;
    let y0RangePV;
    let onlyY0 = false;
    let onlyX0 = false;
    let onlyY1 = false;
    let onlyX1 = false;
    let x1RangePV;
    let y1RangePV;
    let x1legend = [];
    let y1legend = [];
    let x1GraphKey = "x1Graph";
    let y1GraphKey = "y1Graph";
    let numberOfInsertedGraphs = 0;
    let maxHarpsReached = false;
    for (harp in displayHarps) {
      if (displayHarps[harp].systemName === name) {
        displayHarps[harp].inserted = inserted;
      }
      if (displayHarps[harp].inserted === true) {
        if (numberOfInsertedGraphs === 0) {
          if (typeof displayHarps[harp].onlyY !== 'undefined') {
            x0GraphPVs.push('pva://' + displayHarps[harp].systemName + ':ycur');
            x0RangePV = 'pva://' + displayHarps[harp].systemName + ':yrange';
            onlyY0 = true;
          }
          else {
            x0GraphPVs.push('pva://' + displayHarps[harp].systemName + ':xcur');
            x0RangePV = 'pva://' + displayHarps[harp].systemName + ':xrange';
            onlyY0 = false;
          }
          x0legend.push(displayHarps[harp].displayName);
          x0GraphKey = x0GraphKey + displayHarps[harp].systemName;
          x0SystemName = displayHarps[harp].systemName;
          //    }
          if (typeof displayHarps[harp].onlyX !== 'undefined') {
            y0GraphPVs.push('pva://' + displayHarps[harp].systemName + ':xcur');
            y0RangePV = 'pva://' + displayHarps[harp].systemName + ':xrange';
            onlyX0 = true;
          }
          else {
            y0GraphPVs.push('pva://' + displayHarps[harp].systemName + ':ycur');
            y0RangePV = 'pva://' + displayHarps[harp].systemName + ':yrange';
            onlyX0 = false;
          }
          y0GraphKey = y0GraphKey + displayHarps[harp].systemName;
          y0legend.push(displayHarps[harp].displayName);
          numberOfInsertedGraphs++;
        } else {
          if (typeof displayHarps[harp].onlyY !== 'undefined') {
            x1GraphPVs.push('pva://' + displayHarps[harp].systemName + ':ycur');
            x1RangePV = 'pva://' + displayHarps[harp].systemName + ':yrange';
            onlyY1 = true;
          }
          else {
            x1GraphPVs.push('pva://' + displayHarps[harp].systemName + ':xcur');
            x1RangePV = 'pva://' + displayHarps[harp].systemName + ':xrange';
            onlyY1 = false;
          }
          if (typeof displayHarps[harp].onlyX !== 'undefined') {
            y1GraphPVs.push('pva://' + displayHarps[harp].systemName + ':xcur');
            y1RangePV = 'pva://' + displayHarps[harp].systemName + ':xrange';
            onlyX1 = true;
          }
          else {
            y1GraphPVs.push('pva://' + displayHarps[harp].systemName + ':ycur');
            y1RangePV = 'pva://' + displayHarps[harp].systemName + ':yrange';
            onlyX1 = false;
          }
          x1legend.push(displayHarps[harp].displayName);
          y1legend.push(displayHarps[harp].displayName);
          x1GraphKey = x1GraphKey + displayHarps[harp].systemName;
          y1GraphKey = y1GraphKey + displayHarps[harp].systemName;
          x1SystemName = displayHarps[harp].systemName;
          numberOfInsertedGraphs++;
        }
      }
    }
    if (numberOfInsertedGraphs >= 2) {
      maxHarpsReached = true;
    }
    // this.setState({
    //   displayHarps: displayHarps,
    //   maxHarpsReached: maxHarpsReached,
    //   x0GraphPVs: x0GraphPVs,
    //   y0GraphPVs: y0GraphPVs,
    //   x0legend: x0legend,
    //   y0legend: y0legend,
    //   x0GraphKey: x0GraphKey,
    //   y0GraphKey: y0GraphKey,
    //   x1GraphPVs: x1GraphPVs,
    //   y1GraphPVs: y1GraphPVs,
    //   x1legend: x1legend,
    //   y1legend: y1legend,
    //   x1GraphKey: x1GraphKey,
    //   y1GraphKey: y1GraphKey,
    //   x0RangePV: x0RangePV,
    //   x1RangePV: x1RangePV,
    //   y0RangePV: y0RangePV,
    //   y1RangePV: y1RangePV,
    //   x0SystemName: x0SystemName,
    //   x1SystemName: x1SystemName,
    //   onlyX0: onlyX0,
    //   onlyX1: onlyX1,
    //   onlyY0: onlyY0,
    //   onlyY1: onlyY1
    // })
  }

  const footerContents = (
    <Grid container direction="row" justify="flex-start" alignItems="center" >
      <Grid item xs={12} style={{ paddingLeft: "1em" }}>
        <Typography>
        We are in the progress of migrating the original iThemba LABS demo components to reusable hooks components. Watch this space!
        </Typography>
          </Grid>
    </Grid>
   //  <BottomNavigationAction showLabel label="We are in the progress of migrating the original iThemba LABS demo components to reusable hooks components. Watch this space!" />
  )

  const handleSideTabChange = (event, value) => {
    setSideTabValue(value)
  };
  
  return (
    <div style={{ "overflowX": "hidden", 'overflowY': 'hidden' }}>

      <TraditionalLayout
        title="Beamline Control System Example"
        denseAppBar
      //  showFooter
     //   footerHeight={40}
       // footerContents={footerContents}
       
      >
        {harpPvConnections(systems.BeamLine.Harps)}
        <Grid container spacing={3} style={{ paddingTop: 16 }}>
          <Grid item sm={9}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BeamLineCanvas
                  width= "100%"
                  height= "250"
                  svgProps={{  viewBox: "0 0 1410 250", preserveAspectRatio: "xMidYMid meet" }}
                >
                  <HorizontalBeamline
                    x={0}
                    y={yOffset}
                    pv={'pva://testIOC:BeamlineA:BeamOn'}
                    width={'113px'}
                  />
                  <HorizontalBeamline
                    x={'113px'}
                    y={yOffset}
                    pv={'pva://testIOC:BeamlineB:BeamOn'}
                    width={'148px'}
                  />
                  <HorizontalBeamline
                    x={'261px'}
                    y={yOffset}
                    pv={'pva://testIOC:BeamlineC:BeamOn'}
                    width={'150px'}
                  />
                  <HorizontalBeamline
                    x={'411px'}
                    y={yOffset}
                    pv={'pva://testIOC:BeamlineD:BeamOn'}
                    width={'150px'}
                  />
                  <HorizontalBeamline
                    x={'561px'}
                    y={yOffset}
                    pv={'pva://testIOC:BeamlineE:BeamOn'}
                    width={'850px'}
                  />
                  <FC
                    pv={'pva://$(IOC):$(actuatorName)$(sim):put-outIn'}
                    isMovingPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B5'}
                    inLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B6'}
                    outLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B7'}
                    inLimitValue={1}
                    outLimitValue={1}
                    isMovingValue={1}
                    maxFCsReached={false}
                    label={'$(actuatorName)'}
                    macros={{
                      '$(IOC)': 'testIOC',
                      '$(sim)': 'sim',
                      '$(actuatorName)': 'FC1',
                    }
                    }
                    x={38}
                    y={yOffset}
                    alarmSensitive={true}
                    componentGradient={true}
                  />
                  <Harp

                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Harps.Harp1}
                    {...systems.BeamLine.Harps.Harp1}

                  />
                  <FC
                    pv={'pva://$(IOC):$(actuatorName)$(sim):put-outIn'}
                    isMovingPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B5'}
                    inLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B6'}
                    outLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B7'}
                    inLimitValue={1}
                    outLimitValue={1}
                    isMovingValue={1}
                    maxFCsReached={false}
                    label={'$(actuatorName)'}
                    macros={{
                      '$(IOC)': 'testIOC',
                      '$(sim)': 'sim',
                      '$(actuatorName)': 'FC2',
                    }
                    }
                    x={180}
                    y={yOffset}
                    alarmSensitive={true}
                    componentGradient={true}
                  />
                  <QuadrapoleMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.Q1}
                    pv={systems.BeamLine.PowerSupplies.Q1.readbackPv}
                    label={systems.BeamLine.PowerSupplies.Q1.displayName}
                    macros={systems.BeamLine.PowerSupplies.Q1.macros}
                    {...systems.BeamLine.PowerSupplies.Q1.svgProps}
                  />
                  <QuadrapoleMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.Q2}
                    pv={systems.BeamLine.PowerSupplies.Q2.readbackPv}
                    label={systems.BeamLine.PowerSupplies.Q2.displayName}
                    macros={systems.BeamLine.PowerSupplies.Q2.macros}
                    {...systems.BeamLine.PowerSupplies.Q2.svgProps}
                  />
                  <QuadrapoleMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.Q3}
                    pv={systems.BeamLine.PowerSupplies.Q3.readbackPv}
                    label={systems.BeamLine.PowerSupplies.Q3.displayName}
                    macros={systems.BeamLine.PowerSupplies.Q3.macros}
                    {...systems.BeamLine.PowerSupplies.Q3.svgProps}
                  />
                  <Harp
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Harps.Harp2}
                    {...systems.BeamLine.Harps.Harp2}
                  />
                  <FC
                    pv={'pva://$(IOC):$(actuatorName)$(sim):put-outIn'}
                    isMovingPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B5'}
                    inLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B6'}
                    outLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B7'}
                    inLimitValue={1}
                    outLimitValue={1}
                    isMovingValue={1}
                    maxFCsReached={false}
                    label={'$(actuatorName)'}
                    macros={{
                      '$(IOC)': 'testIOC',
                      '$(sim)': 'sim',
                      '$(actuatorName)': 'FC3',
                    }
                    }
                    x={335}
                    y={yOffset}
                    alarmSensitive={true}
                    componentGradient={true}
                  />
                  <Harp
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Harps.Harp3}
                    {...systems.BeamLine.Harps.Harp3}
                  />
                  <FC
                    pv={'pva://$(IOC):$(actuatorName)$(sim):put-outIn'}
                    isMovingPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B5'}
                    inLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B6'}
                    outLimitPv={'pva://$(IOC):$(actuatorName)$(sim):get-status.B7'}
                    inLimitValue={1}
                    outLimitValue={1}
                    isMovingValue={1}
                    maxFCsReached={false}
                    label={'$(actuatorName)'}
                    macros={{
                      '$(IOC)': 'testIOC',
                      '$(sim)': 'sim',
                      '$(actuatorName)': 'FC4',
                    }
                    }
                    x={535}
                    y={yOffset}
                    alarmSensitive={true}
                    componentGradient={true}
                  />
                  <SlitXY
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Slits.SLITXY1}
                    xGapPv={systems.BeamLine.Slits.SLITXY1.xGapReadbackPv}
                    yGapPv={systems.BeamLine.Slits.SLITXY1.yGapReadbackPv}
                    xOffsetPv={systems.BeamLine.Slits.SLITXY1.xOffsetReadbackPv}
                    yOffsetPv={systems.BeamLine.Slits.SLITXY1.yOffsetReadbackPv}
                    label={systems.BeamLine.Slits.SLITXY1.displayName}
                    macros={systems.BeamLine.Slits.SLITXY1.macros}
                    {...systems.BeamLine.Slits.SLITXY1.svgProps}
                  />
                  <SlitXY
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Slits.SLITXY2}
                    xGapPv={systems.BeamLine.Slits.SLITXY2.xGapReadbackPv}
                    yGapPv={systems.BeamLine.Slits.SLITXY2.yGapReadbackPv}
                    xOffsetPv={systems.BeamLine.Slits.SLITXY2.xOffsetReadbackPv}
                    yOffsetPv={systems.BeamLine.Slits.SLITXY2.yOffsetReadbackPv}
                    label={systems.BeamLine.Slits.SLITXY2.displayName}
                    macros={systems.BeamLine.Slits.SLITXY2.macros}
                    {...systems.BeamLine.Slits.SLITXY2.svgProps}
                  />
                  <Harp
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.Harps.Harp4}
                    {...systems.BeamLine.Harps.Harp4}
                  />
                  <SteererXYMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.STR2XY}
                    xPv={systems.BeamLine.PowerSupplies.STR2XY.xReadbackPv}
                    yPv={systems.BeamLine.PowerSupplies.STR2XY.yReadbackPv}
                    label={systems.BeamLine.PowerSupplies.STR2XY.displayName}
                    macros={systems.BeamLine.PowerSupplies.STR2XY.macros}
                    {...systems.BeamLine.PowerSupplies.STR2XY.svgProps}
                  />
                  <SteererXYMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.STR1XY}
                    xPv={systems.BeamLine.PowerSupplies.STR1XY.xReadbackPv}
                    yPv={systems.BeamLine.PowerSupplies.STR1XY.yReadbackPv}
                    label={systems.BeamLine.PowerSupplies.STR1XY.displayName}
                    macros={systems.BeamLine.PowerSupplies.STR1XY.macros}
                    {...systems.BeamLine.PowerSupplies.STR1XY.svgProps}
                  />
                  <SteererYMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.STR2}
                    pv={systems.BeamLine.PowerSupplies.STR2.readbackPv}
                    label={systems.BeamLine.PowerSupplies.STR2.displayName}
                    macros={systems.BeamLine.PowerSupplies.STR2.macros}
                    {...systems.BeamLine.PowerSupplies.STR2.svgProps}
                  />
                  <SteererYMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.STR3}
                    pv={systems.BeamLine.PowerSupplies.STR3.readbackPv}
                    label={systems.BeamLine.PowerSupplies.STR3.displayName}
                    macros={systems.BeamLine.PowerSupplies.STR3.macros}
                    {...systems.BeamLine.PowerSupplies.STR3.svgProps}
                  />
                  <BendingMagnet
                    handleOnClick={handleOnSystemClick}
                    system={systems.BeamLine.PowerSupplies.BM1}
                    pv={systems.BeamLine.PowerSupplies.BM1.readbackPv}
                    label={systems.BeamLine.PowerSupplies.BM1.displayName}
                    macros={systems.BeamLine.PowerSupplies.BM1.macros}
                    {...systems.BeamLine.PowerSupplies.BM1.svgProps}
                  />
                </BeamLineCanvas>
              </Grid>
              <Grid item sm={12}>
                <AppBar position="static" color='inherit' indicatorcolor="secondary">
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab label="Table" />
                    <Tab label="Power Supplies Diagnostics" />
                    <Tab label="Ion Source" />
                    <Tab label="Beam Diagnostics" />
                  </Tabs>
                </AppBar>
              </Grid>
              {tabValue === 3 &&
                <React.Fragment>
                  <Grid item sm={12}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item sm={2} >
                        <div style={{ height: '30vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                          {(x0SystemName !== null) && <React.Fragment>
                            <HarpRangeSelection onlyX={onlyX0} onlyY={onlyY0} key={'harpRangeSelectionx0' + x0SystemName} systemName={x0SystemName} label={'Range'} />
                            <div style={{ marginBottom: 8 }}>
                              {((onlyY0 === false) && (onlyX0 === false)) &&
                                <ActionButton key={'storex0' + x0SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                              }
                              {((onlyY0 === true) && (onlyX0 === false)) &&
                                <ActionButton key={'storex0' + x0SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                              }
                              {((onlyY0 === false) && (onlyX0 === true)) &&
                                <ActionButton key={'storex0' + x0SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                              }
                            </div>
                            <div style={{ marginBottom: 8 }}>
                              {((onlyY0 === false) && (onlyX0 === false)) &&
                                <ActionButton key={'clearx0' + x0SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                              }
                              {((onlyY0 === true) && (onlyX0 === false)) &&
                                <ActionButton key={'clearx0' + x0SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                              }
                              {((onlyY0 === false) && (onlyX0 === true)) &&
                                <ActionButton key={'clearx0' + x0SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                              }
                            </div>
                          </React.Fragment>}
                        </div>
                      </Grid>
                      <Grid item sm={10}>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                        >
                          <Grid item sm={6}>
                            <div style={{ height: '30vh' }}>
                              {((onlyY0 === false) && x0GraphPVs.length > 0) && <HarpGraph
                                ymax={2000}
                                units={'pA'}
                                key={x0GraphKey}
                                dataPVs={x0GraphPVs}
                                rangePV={x0RangePV}
                                legend={x0legend}
                                changeOtherGraphYmax={setTopYgraphYmax}
                                ymaxFromOtherGraph={topXgraphYmax}
                                ylabel="X Axis"
                              />}
                              {/*}<GraphTest style pv='pva://testIOC:test4'  />*/}
                            </div>
                          </Grid>
                          <Grid item sm={6}>
                            <div style={{ height: '30vh' }}>
                              {((onlyX0 === false) && y0GraphPVs.length > 0) && <HarpGraph
                                ymax={2000}
                                units={'pA'}
                                key={y0GraphKey}
                                dataPVs={y0GraphPVs}
                                rangePV={y0RangePV}
                                legend={y0legend}
                                changeOtherGraphYmax={setTopXgraphYmax}
                                ymaxFromOtherGraph={topYgraphYmax}
                                ylabel="Y Axis"
                              />}
                              {/*  <GraphTest style pv='pva://testIOC:PS1:Readback:History'  />*/}
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={12}>
                    <div style={{ height: '30vh' }}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                      >
                        <Grid item sm={2}>
                          <div style={{ height: '30vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                            {(x1SystemName !== null) && <React.Fragment>
                              <HarpRangeSelection onlyX={onlyX1} onlyY={onlyY1} key={'harpRangeSelectionx1' + x1SystemName} systemName={x1SystemName} label={'Range'} />
                              <div style={{ marginBottom: 8 }}>
                                {((onlyY1 === false) && (onlyX1 === false)) &&
                                  <ActionButton key={'storex1' + x1SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                }
                                {((onlyY1 === true) && (onlyX1 === false)) &&
                                  <ActionButton key={'storex1' + x1SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                }
                                {((onlyY1 === false) && (onlyX1 === true)) &&
                                  <ActionButton key={'storex1' + x1SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                }
                              </div>
                              <div style={{ marginBottom: 8 }}>
                                {((onlyY1 === false) && (onlyX1 === false)) &&
                                  <ActionButton key={'clearx1' + x1SystemName} pvs={['pva://$(device):x_store_offset', 'pva://$(device):y_store_offset']} macros={{ '$(device)': x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                }
                                {((onlyY1 === true) && (onlyX1 === false)) &&
                                  <ActionButton key={'clearx1' + x1SystemName} pvs={['pva://$(device):y_store_offset']} macros={{ '$(device)': x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                }
                                {((onlyY1 === false) && (onlyX1 === true)) &&
                                  <ActionButton key={'clearx1' + x1SystemName} pvs={['pva://$(device):x_store_offset']} macros={{ '$(device)': x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                }
                              </div>
                            </React.Fragment>}
                          </div>
                        </Grid>
                        <Grid item sm={10}>
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                          >
                            <Grid
                              container
                              direction="row"
                              justify="flex-start"
                              alignItems="center"
                            >
                              <Grid item sm={6}>
                                <div style={{ height: '30vh' }}>
                                  {((onlyY1 === false) && x1GraphPVs.length > 0) && <HarpGraph
                                    ymax={2000}
                                    units={'pA'}
                                    key={x1GraphKey}
                                    dataPVs={x1GraphPVs}
                                    rangePV={x1RangePV}
                                    legend={x1legend}
                                    ylabel="X Axis"
                                    changeOtherGraphYmax={setBottomYgraphYmax}
                                    ymaxFromOtherGraph={bottomXgraphYmax}
                                  />}
                                  {/*}<GraphTest style pv='pva://testIOC:test4'  />*/}
                                </div>
                              </Grid>
                              <Grid item sm={6}>
                                <div style={{ height: '30vh' }}>
                                  {((onlyX1 === false) && y1GraphPVs.length > 0) && <HarpGraph
                                    ymax={2000}
                                    units={'pA'}
                                    key={y1GraphKey}
                                    dataPVs={y1GraphPVs}
                                    rangePV={y1RangePV}
                                    legend={y1legend}
                                    ylabel="Y Axis"
                                    changeOtherGraphYmax={setBottomXgraphYmax}
                                    ymaxFromOtherGraph={bottomYgraphYmax}
                                  />}
                                  {/*  <GraphTest style pv='pva://testIOC:PS1:Readback:History'  />*/}
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </React.Fragment>}
              {tabValue === 1 &&
                <React.Fragment>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item sm={6}>
                      <div style={{ height: '50vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                        <GraphY
                          pvs={['pva://testIOC:PS1:Readback', 'pva://testIOC:PS2:Readback', 'pva://testIOC:PS3:Readback']}
                          maxLength={600}
                          legend={[
                            'Q1 readback',
                            'Q2 readback',
                            'Q3 readback',
                          ]}
                          yUnits={' A'}
                          useTimeStamp={true}
                          usePolling={true}
                          pollingRate={100}
                        />
                        {/*}<GraphTest style pv='pva://testIOC:test4'  />*/}
                      </div>
                    </Grid>
                    <Grid item sm={6}>
                      <div style={{ height: '50vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                        {/*}  <GraphY
                            pvs={[
                            'pva://testIOC:PS1:Readback:History',
                            'pva://testIOC:PS2:Readback:History',
                            'pva://testIOC:PS3:Readback:History',
                            'pva://testIOC:PS4:Readback:History',
                            'pva://testIOC:STR1:X:Readback:History'
                            ]}
                            legend = {[
                            'PS1',
                            'PS2',
                            'PS3',
                            'PS4',
                            'STR1:X',
                            ]}
                          />*/}
                        <GraphY
                          pvs={[
                            'pva://testIOC:PS1:Setpoint',
                            'pva://testIOC:PS2:Setpoint',
                            'pva://testIOC:PS3:Setpoint',
                          ]}
                          maxLength={600}
                          usePolling={true}
                          pollingRate={100}
                          legend={[
                            'Q1 setpoint',
                            'Q2 setpoint',
                            'Q3 setpoint',
                          ]}
                          yUnits={' A'}
                          useTimeStamp={true}
                        />
                        {/*  <GraphTest style pv='pva://testIOC:PS1:Readback:History'  />*/}
                      </div>
                    </Grid>
                  </Grid>
                </React.Fragment>}
              {tabValue === 2 &&
                <React.Fragment>
                  <Grid item sm={12}>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <Grid item sm={2} style={{ marginLeft: 10 }}>
                        <ToggleButton pv='pva://testIOC:BeamlineA:BeamOn' label={"Beam On"} labelPlacement={"top"} />
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>}
              {tabValue === 0 &&
                <Grid item sm={12}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Grid item sm={2}>
                      <AppBar position="static" color="inherit" >
                        <VerticalTabs
                          value={sideTabValue}
                          onChange={handleSideTabChange}
                          indicatorColor="primary"
                          textColor="primary"
                        >
                          <Tab label="All" />    {/* side Tab 0*/}
                          <Tab label="Power Supplies" />    {/* side Tab 1*/}
                          <Tab label="Slits" />  {/* side Tab 2*/}
                        </VerticalTabs>
                      </AppBar>
                    </Grid>
                    <Grid item sm={10}>
                      {sideTabValue === 0 && <TabContainer> <ControlTable style={{ overflowY: 'scroll', maxHeight: '50vh' }} handleOnSystemClick={handleOnSystemClick} systems={allSystems} />                            </TabContainer>}
                      {sideTabValue === 1 && <TabContainer> <ControlTable handleOnSystemClick={handleOnSystemClick} systems={systems['BeamLine']['PowerSupplies']} />  </TabContainer>}
                      {sideTabValue === 2 && <TabContainer> <ControlTable handleOnSystemClick={handleOnSystemClick} systems={systems['BeamLine']['Slits']} />         </TabContainer>}
                    </Grid>
                  </Grid>
                </Grid>}
            </Grid>
          </Grid>
          <Grid item sm={3} >
            {((displayEditor === true) && (editorType === 'editorSteererXY')) && <EditorSteererXY key={'editor-key' + editorSystem.systemName} system={editorSystem} handleCloseEditor={() => setDisplayEditor(false)} />}
            {((displayEditor === true) && (editorType === 'editorSinglePS')) && <EditorSinglePS key={'editor-key' + editorSystem.systemName} system={editorSystem} handleCloseEditor={() => setDisplayEditor(false)} />}
            {((displayEditor === true) && (editorType === 'editorSlitXY')) && <EditorSlitXY key={'editor-key' + editorSystem.systemName} system={editorSystem} handleCloseEditor={() => setDisplayEditor(false)} />}
          </Grid>
        </Grid>
        <AppBar  style={{position:'fixed',bottom:0,top:'auto',height:40}}color={props.theme.palette.type === 'dark' ? "inherit" : "primary"}>
          {footerContents}
        </AppBar>
      </TraditionalLayout>
    </div>
  );
}
BeamlineControlSystem.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles,{withTheme:true})(BeamlineControlSystem);
                    //export default BeamlineControlSystem;
