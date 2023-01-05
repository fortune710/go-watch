import { Box, Modal, SxProps } from "@mui/material"

interface ModalProps {
    isOpen: boolean,
    onDismiss: any,
    children: React.ReactNode
}
export const CustomModal: React.FC<ModalProps> = ({ children, isOpen, onDismiss }) => {
    const BoxStyles: SxProps = {
        backgroundColor: 'var(--background-tint)',
        width: '80%',
        borderRadius: '10px',
        padding: '8px'
    }

    const ModalStyles: SxProps = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }

    
    return(
        <Modal 
            sx={ModalStyles} 
            open={isOpen} 
            onClose={onDismiss}
        >
            <Box sx={BoxStyles}>
                {children}
            </Box>
        </Modal>
    )    
}