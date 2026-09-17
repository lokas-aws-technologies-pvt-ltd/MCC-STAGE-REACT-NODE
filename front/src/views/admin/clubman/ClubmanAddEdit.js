/* eslint-disable no-cond-assign */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { eventFilePath } from 'constants.js';
import { parseISO } from 'date-fns';
import moment from 'moment';

const ClubmanAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = {
    id: '',
    pdf_document: '',
    issue_no: '',
    issue_date: '',
  };
  const [selectedItem, setSelectedItem] = useState(emptyItem);

  const [startDate, setStartDate] = useState(null);

  const validationSchema = Yup.object().shape({
    issue_no: Yup.string().required('Issue No is required'),
    issue_date: Yup.date().typeError('Invalid date').required('Issue Date is required'),
    pdf_document: Yup.mixed().required('Magazine Pdf is required'),
  });

  const onSubmit = (values, { resetForm }) => {
    // console.log('submit form', values);
    // values.parentCat = selectParentCat;
    if (selectedFlatRows.length === 1) {
      editItem({ item: values });

      // const { index } = selectedFlatRows[0];
      // const newData = data.map((row, rowIndex) => (rowIndex === index ? selectedItem : row));
      // setData(newData);
    } else {
      addItem({ item: values });
    }
    resetForm({ values: '' });
    setIsOpenAddEditModal(false);
  };

  // console.log(selectedItem);
  const initialValues = selectedItem;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;
  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      // console.log(selectedFlatRows[0].original.image);
      setSelectedItem(selectedFlatRows[0].original);
    } else {
      setSelectedItem(emptyItem);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddEditModal, selectedFlatRows]);
  useEffect(() => {

    if (selectedFlatRows.length === 1) {
      // get user and set form fields
     console.log('selectedFlatRows', selectedFlatRows);
      const fields = ['id', 'pdf_document', 'issue_no', 'issue_date'];
      fields.forEach((field) => {
        console.log('selectedItem', selectedFlatRows[field]);

        if (field == 'issue_date') {
          const myStartDate = selectedItem.issue_date;
          // const myStartDate = format(myStartDate1, 'dd-MM-yyyy hh:mm a');
          //  const myStartDate = new Date(Date.parse(selectedItem[field].replace('-','/','g')));
          // myStartDate = moment(myStartDate).format('DD-MM-YYYYY hh:mm a')

          console.log('myStartDate', Date.parse(myStartDate));
          setStartDate(Date.parse(myStartDate));
          setFieldValue(field, myStartDate, false);
        } else {
          setFieldValue(field, selectedItem[field], false);
        }
      });
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows, setFieldValue]);
  return (
    <Modal className="modal-centered" size="xl" backdrop="static" keyboard={false} show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container fluid>
            <Row>
              <Col md="6">
                <Row>
                  <Col md="6">
                    <div className="mb-3">
                      <Form.Label>Issue No</Form.Label>
                      <Form.Control type="text" name="issue_no" defaultValue={selectedItem ? selectedItem.issue_no : values.issue_no} onChange={handleChange} />

                      {errors.issue_no && touched.issue_no && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.issue_no}
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="mb-3">
                      <Form.Label>Issue Date</Form.Label>
                      <DatePicker
                        className="form-control"
                        name="issue_date"
                        selected={startDate}
                        showMonthYearPicker
                        shouldCloseOnSelect
                        onChange={(date) => {
                          setStartDate(date);
                          //  handleChange(date);
                          setFieldValue('issue_date', date);
                        }}
                        dateFormat="MM-yyyy"
                      />
                      {errors.issue_date && touched.issue_date && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.issue_date}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <div className="mb-3">
                      <Form.Label>Issue in Pdf</Form.Label>
                      <Form.Control
                        type="file"
                        name="pdf_document"
                        accept="application/pdf"
                        defaultValue={selectedItem ? selectedItem.pdf_document : values.pdf_document}
                        // onChange={handleChange}
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue('issue_file', e.currentTarget.files[0]);
                        }}
                      />
                      {errors.pdf_document && touched.pdf_document && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.pdf_document}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <div className="mb-3">
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    formik.resetForm({ values: '' });
                    setIsOpenAddEditModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {selectedFlatRows.length === 1 ? 'Done' : 'Add'}
                </Button>
              </div>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default ClubmanAddEdit;
