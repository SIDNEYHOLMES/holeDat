/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PotholeRating from '../formQuestions/PotholeRating';
import PotholeStatus from '../formQuestions/PotholeStatus';

//status section view
const StatusSection = (prop) => {
  const { handleSubmit } = prop; 

  return (
    <Form.Group id='statusSection'>
      <Form.Group className='questionGroup'>
        <Form.Label className='formQuestion'>What would you rate the pothole?</Form.Label>
        <p className='formText line1'>
          Rate between 1-5 cones the severity of the pothole:
          <span className='newline xsmall line1 line2'>
            <span className='moreDef'>1 cone ('Harmless')</span>: the pothole is small, shallow and
            does not pose much danger to vehicles.
          </span>
          <span className='newline xsmall line2'>
            <span className='moreDef'>5 cones ('Severe')</span>: the pothole is severe, deep and
            poses a potential threat to vehicles.
          </span>
        </p>
        <PotholeRating />
      </Form.Group>

      <Form.Group className='questionGroup'>
        <Form.Label className='formQuestion'>Is the Pothole Fixed?</Form.Label>
        <PotholeStatus />
      </Form.Group>

      <Button id='nextFormButton' className='basicButton' type='button' onClick={handleSubmit}>
        <div className='center' id='wtf'>
          Submit
          <div className='arrow-button arrow-right'></div>
        </div>
      </Button>
    </Form.Group>
  );};

export default StatusSection;
