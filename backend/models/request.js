const pool = require('../config/database');

const createRequest = async (requestData) => {
  const {
    fullName,
    email,
    phone,
    workType,
    deadline,
    notes,
    files
  } = requestData;

  const query = `
    INSERT INTO requests (full_name, email, phone, work_type, deadline, notes, files)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  const values = [fullName, email, phone, workType, deadline, notes, files];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateRequestPayment = async (requestId, paymentData) => {
  const { transactionId, amount, status } = paymentData;
  
  const query = `
    UPDATE requests 
    SET payment_status = $1, transaction_id = $2, amount_paid = $3, paid_at = NOW()
    WHERE id = $4
    RETURNING *
  `;

  const values = [status, transactionId, amount, requestId];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getRequestById = async (id) => {
  const query = 'SELECT * FROM requests WHERE id = $1';
  
  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRequest,
  updateRequestPayment,
  getRequestById
};