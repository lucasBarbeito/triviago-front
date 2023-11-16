'use client';
import {useRouter} from 'next/navigation';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import {useRequestService} from "@/service/request.service";
import Cookies from "js-cookie";

const DeleteAccountModal = ({ isOpen, onClose, showSnackbar, userId }) => {
    const router = useRouter();
    const service = useRequestService();

    const handleDeleteClick = () => {
        service.deleteUser(userId)
            .then(r => {
                if (r.status === 200) {
                    localStorage.removeItem('token')
                    Cookies.remove("jwt")
                    router.push(`/signin`);
                }
            })
            .catch(e => {
                showSnackbar('Hubo un error al intentar eliminar tu cuenta.', 'error')
            });
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle>Eliminar cuenta</DialogTitle>
            <DialogContent>
                <Typography>
                    ¿Estás seguro que deseas eliminar tu cuenta?
                </Typography>
            </DialogContent>
            <DialogActions style={{padding: '0px 20px 24px 24px'}}>
                <Button
                    // variant="contained"
                    // style={{backgroundColor: '#0C6'}}
                    disableRipple
                    onClick={onClose}
                    style={{color: '#000', backgroundColor: 'transparent'}}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    style={{backgroundColor: '#EA0E0E'}}
                    onClick={handleDeleteClick}
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAccountModal;
