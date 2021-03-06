/********************************************************************************
 * Copyright (c) 2020-2021 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 ********************************************************************************/
import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepperComponent from './StepperComponent';
import {Grid, IconButton, StepContent} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Tutorial} from '../../../schema/tutorial';
import {vsTheme} from '../VsTheme';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        text: {
            color: vsTheme.text.color,
            textAlign: "left",
        },
    }),
);

interface TutorialOverviewProps {
    tutorial: Tutorial;
}

const TutorialOverview = (props: TutorialOverviewProps) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(-1);

    return (
        activeStep < 0 ?
            <div className={classes.root}>
                <Stepper orientation="vertical" style={{backgroundColor: "transparent"}}>
                    {props.tutorial.exercises && props.tutorial.exercises.map((ex) => (
                        <Step key={ex.title} active={true}>
                            <StepLabel><Typography className={classes.text}>{ex.title}</Typography></StepLabel>
                            <StepContent>
                                <p className={classes.text}>{ex.description}</p>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="center"
                                >
                                    <IconButton size="small" onClick={() => {
                                        if (props.tutorial.exercises) {
                                            setActiveStep(props.tutorial.exercises.indexOf(ex));
                                        }
                                    }}>
                                        <ArrowForwardIosIcon fontSize="small" style={{fill: vsTheme.Button.color, backgroundColor: vsTheme.Button.backgroundColor}} />
                                    </IconButton>
                                </Grid>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div > :
            <div>
                <StepperComponent tutorial={props.tutorial} startStep={activeStep} />
            </div>
    );
};

export default TutorialOverview;