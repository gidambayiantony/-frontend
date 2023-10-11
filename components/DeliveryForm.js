"use client";
import { Box, FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { DB_URL } from '@config/config';
import axios from 'axios';

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    location: '',
    businessName: '',
    businessAddress: '',
    businessHours: '',
    transport: 'bike',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${DB_URL}/partner/new`, formData);
      setSuccessMessage('Form submitted successfully!');
      // Clear form fields here
    } catch (error) {
      console.error('Error creating partner', error);
    }
  };

  return (
    <Box className="mx-auto p-4 bg-black mb-20 mt-20">
      <p className="text-3xl text-left mb-4 text-dark">Fill out the form to start delivering</p>
      <form onSubmit={handleSubmit}>
        <FormControl className="mb-4">
          <FormLabel>Name*</FormLabel>
          <Input
            type="text"
            value={formData.fullname}
            onChange={(event) => setFormData({ ...formData, fullname: event.target.value })}
            placeholder="Name Lastname"
            required
          />
        </FormControl>
        {/* Add similar fields for Phone number, Location, Email address, Business name, Business address, Business hours */}
        <FormControl className="mb-4">
          <FormLabel>Transport*</FormLabel>
          <Select
            value={formData.transport}
            onChange={(event) => setFormData({ ...formData, transport: event.target.value })}
            required
          >
            <option value="bike">Bike</option>
            <option value="vehicle">Vehicle</option>
            <option value="motorcycle">Motorcycle</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal" className="bg-green-500 mt-4">
          Sign up
        </Button>
        {successMessage && (
          <div className="text-dark text-center mt-4">{successMessage}</div>
        )}
      </form>
    </Box>
  );
};

export default DeliveryForm;

