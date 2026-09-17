/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SERVICE_URL, API_URL } from 'config.js';
import axios from 'axios';



const BanquetMenuItemAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, setIsOpenAddEditModal, isOpenAddEditModal,banmenu } = tableInstance;
  const emptyItem = {
    banquet_menu_id: '',
    banquet_menu_name: '',
    banquet_menu_cost: '',
    banquet_menu_type: '',
    no_veg_dish: '0',
    no_non_veg_dish: '0',
    no_bread: '0',
    no_rice: '0',
    no_salad: '0',
    no_curd_pickle: '0',
    no_icecream: '0',
    fish_addon_cost: '0',
    banquet_menu_status: '0',
  };
  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const [selectedcourseitem, setSelectedcourseitem] = useState([]);
  const [selectedbanquetmenuid, setSelectedbanquetmenuid] = useState('');
  
  const validationSchema = Yup.object().shape({
    banquet_menu_name: Yup.string().required('Banquet Menu Name is required'),
    banquet_menu_cost: Yup.string().required('Veg / Non-veg is required'),
    no_veg_dish: Yup.number().positive().required('Status is required'),
    no_non_veg_dish: Yup.number().positive().required('Category is required'),
    no_bread: Yup.number().positive().required('Sub Category is required'),
    no_rice: Yup.number().positive().required('Description is required'),
    no_salad: Yup.number().positive().required('Price is required'),
    no_curd_pickle: Yup.number().positive().required('Price is required'),
    no_icecream: Yup.number().positive().required('Price is required'),
    fish_addon_cost: Yup.string().required('Price is required'),
    banquet_menu_status: Yup.number().positive().required('Price is required'),
  });
  const [menucourse, setmenucourse] = useState([]);
  const onSubmit = (values, { resetForm }) => {
    // console.log('submit form', values);

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

  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      setSelectedItem(selectedFlatRows[0].original);
    } else {
      setSelectedItem(emptyItem);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddEditModal, selectedFlatRows]);

  // console.log(selectedItem);
  const initialValues = selectedItem;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;

  const changeActive = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, banquet_menu_status: event.target.value });
    }
  };

  useEffect(() => {
    if (selectedFlatRows.length === 1) {
      // get user and set form fields
      const fields = [
        'banquet_menu_id',
        'banquet_menu_name',
        'banquet_menu_cost',
        'banquet_menu_id',
        'no_veg_dish',
        'no_non_veg_dish',
        'no_bread',
        'no_rice',
        'no_salad',
        'no_curd_pickle',
        'no_icecream',
        'fish_addon_cost',
        'banquet_menu_status',
      ];
      fields.forEach((field) => {
        // console.log('selectedItem', selectedItem[field]);
        setFieldValue(field, selectedItem[field], false);
      });
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows]);

  const fetchBanquetmenucourse= React.useCallback(async () => {
    
    const type=selectedFlatRows[0].original.banquet_menu_type;
   
    const response = await axios.get(`${API_URL}banquet/banquet_menu_course_get`,{ params: { type } });

    setTimeout(() => {
      const resultlist = response.data.result;
      setmenucourse(response.data.result);
      
    }, 1000);
  }, [selectedFlatRows]);

   async function getmenucouselist(courseid)
  {
    
    const response =  await axios.get(`${API_URL}banquet/banquet_menu_course_item_get`,{ params: { courseid } });
    
      const resultlist = response.data.result;

    //   {resultlist.map(msgTemplate => (
    //     <option key={msgTemplate.id} value={msgTemplate.text}>
    //         {msgTemplate.text}
    //     </option>
    // ))}

    //   return resultlist.map(function (mark, i) {
    //     return <option
    //         key={mark.item_id}
    //         value={mark.item_id}>
    //         {mark.item_name}
    //     </option>
    // });
  //     for (var i = 0; i < resultlist.length; i++) {
  //     items.push(<option key={resultlist[i].item_id} value={resultlist[i].item_id}>{resultlist[i].item_name}</option>); 
  //     }
  // return items;
  }
  useEffect(() => {
    if(selectedFlatRows.length==1){
      setSelectedbanquetmenuid(selectedFlatRows[0].original.banquet_menu_id);
    fetchBanquetmenucourse ();
    }
  }, [selectedFlatRows]);


  async function getDatadefault() {

    const menuid = selectedbanquetmenuid;
    const response = await axios.get(`${API_URL}banquet/banquet_menu_map_record`,{ params: { menuid } });
    
    return response.data.result;
  }

  
  async function insertdatasingle(selected,menuid,banquetmenucourseid,isChecked) {   
    
    const response = await axios.get(`${API_URL}banquet/banquet_menu_map_record_insert_single`,{ params: { selected,menuid,banquetmenucourseid,isChecked } });
    setTimeout(() => {
      getDatadefault().then(result => {
        setSelectedcourseitem(result);
      });
      
    }, 2000);
   
    // return response.data.success;
    
}
  const handleSelect = (value,isChecked,banquetmenucourseid) => {
    
    // const value = event.target.value;
    // const isChecked = event.target.checked;
    const selected=[];
    // console.log(['joe', 'jane', 'mary'].includes('jane')); //true
    if (isChecked) {
      insertdatasingle(value,selectedbanquetmenuid,banquetmenucourseid,"1");
    } else {
      insertdatasingle(value,selectedbanquetmenuid,banquetmenucourseid,"0");
    }
     
    
  };

 
  


  

useEffect(() => {
   
    getDatadefault().then(result => {
      setSelectedcourseitem(result);
      // setSelectedcourseitem([1,15]);
    });  
}, [selectedbanquetmenuid]);

useEffect(() => {
  console.log(selectedcourseitem);
}, [selectedcourseitem]);

  // console.log('selectedItem', selectedItem);
  return (
    <Modal className="modal-centered" size="xl" backdrop="static" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <div className="mb-6">
        <Form.Label>Banquet Menu Name</Form.Label>
            <Form.Control
              type="text"
              name="banquet_menu_name" readOnly
              defaultValue={selectedItem ? selectedItem.banquet_menu_name : values.banquet_menu_name}
              onChange={handleChange}
            />

            {errors.banquet_menu_name && touched.banquet_menu_name && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.banquet_menu_name}
              </div>
            )}
          </div>

          {menucourse.map((d) =><>  <div className="mb-6">
           <b><li key={d.banquet_menu_course_id}>{d.banquet_menu_course_name}</li></b> 
            <br/> 
            {d.order_items!=null && JSON.parse(d.order_items).length > 0 && JSON.parse(d.order_items).map(function (Items) {
            return (
              <div key={Items.item_id} className="checkbox-container">
                <input
                  type="checkbox"
                  name="items"
                  defaultChecked={ selectedcourseitem.some(item => item.food_item_id === Items.item_id)}
                   value={Items.item_id}
                   onChange={(e) => {
                    // handleChange(e);
                    handleSelect(e.target.value,e.target.checked,d.banquet_menu_course_id);
                  }}
                 
                />&nbsp;
                <label>{Items.item_name}</label>
              </div>
            );
          })}
                                </div></>)}

          
          <div className="mb-3">
            <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false)}>
              Done
            </Button>
            {/* <Button variant="primary" type="submit">
              {selectedFlatRows.length === 1 ? 'Done' : 'Add'}
            </Button> */}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default BanquetMenuItemAddEdit;
