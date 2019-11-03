import React, { useState } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';

const FileUploadModal = ({
  show,
  isFetching,
  isFetched,
  error,
  onHide,
  onSubmit
}) => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Photo</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={e => {
            onSubmit(e, file);
          }}
        >
          <Modal.Body>
            {error.photo && <p style={{ color: 'red' }}>{error.photo} *</p>}
            <Form.Group
              className="form-modal custom-file mb-4"
              controlId="formPhotoUpload"
            >
              <Form.Label className="custom-file-label">{fileName}</Form.Label>
              <Form.Control
                type="file"
                className="custom-file-input"
                onChange={onChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {isFetched && (
              <p
                style={{
                  color: 'green',
                  fontWeight: 'bold',
                  marginLeft: '10px',
                  fontSize: '1.2rem'
                }}
              >
                Edit photo success!
              </p>
            )}
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            {isFetching ? (
              <Button
                className="disabled"
                variant="primary"
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Spinner
                  animation="border"
                  variant="light"
                  size="sm"
                  style={{ marginRight: '10px' }}
                />
                Loading...
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Save Change
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default FileUploadModal;
