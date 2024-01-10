import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import RefreshIcon from "@mui/icons-material/Refresh";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setColumns([
            { field: "id", headerName: "Id", width: 100 },
            { field: "name", headerName: "Name", width: 150 },
            { field: "email", headerName: "E-mail", width: 200 },
            {
              field: "actions",
              headerName: "Action",
              width: 300,
              renderCell: (params) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Link to={`/update/${params.row.id}`}>
                    <EditIcon color="primary" style={{ marginRight: 20 }} />
                  </Link>
                  <InfoIcon
                    color="info"
                    onClick={() => handleViewDetails(params.row)}
                    style={{ marginRight: 20 }}
                  />
                  <DeleteIcon
                    color="error"
                    onClick={() => handleOpenDeleteDialog(params.row.id)}
                  />
                </div>
              ),
            },
          ]);
          setRecords(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteRecordId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteRecordId(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    if (deleteRecordId) {
      try {
        await axios.delete(`http://localhost:3001/users/${deleteRecordId}`);
        toast.success("Data deleted");

        // Update the state to trigger a re-render
        setRecords((prevRecords) =>
          prevRecords.filter((record) => record.id !== deleteRecordId)
        );

        handleCloseDeleteDialog();
      } catch (err) {
        console.error("Error deleting data:", err);
        toast.error("Error deleting data");
      }
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="text-start m-4">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          key={resetKey}
          rows={records}
          columns={columns}
          pageSize={7}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          components={{
            Toolbar: () => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <CustomToolbar
                  onResetSorting={() => setResetKey((prevKey) => prevKey + 1)}
                />
              </div>
            ),
          }}
        />
      </div>

      {/* Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <div>
              <DialogContentText>ID: {selectedRecord.id}</DialogContentText>
              <DialogContentText>Name: {selectedRecord.name}</DialogContentText>
              <DialogContentText>
                Email: {selectedRecord.email}
              </DialogContentText>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// CustomToolbar component for the DataGrid
function CustomToolbar({ onResetSorting }) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <GridToolbarDensitySelector />
      <Button
        onClick={onResetSorting}
        color="primary"
        startIcon={<RefreshIcon />}
        style={{
          fontWeight: "bold",
          marginLeft: "241%",
          marginTop: "-10%",
        }}
      >
        Reset
      </Button>
    </GridToolbarContainer>
  );
}

export default App;
