import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import Backdrop from "@mui/material/Backdrop";
import styled from "styled-components";

interface FadeProps {
  children?: React.ReactElement;
  in?: boolean;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, children, onEnter, onExited } = props;
  const style = useSpring({
    opacity: open ? 1 : 0,
    config: { duration: 300 },
    onStart: () => open && onEnter && onEnter(null as any, true),
    onRest: () => !open && onExited && onExited(null as any, true),
  });

  return (
    <animated.div ref={ref} style={style}>
      {children}
    </animated.div>
  );
});

const StyledModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  overflow: "hidden",
};

interface Props {
  open: boolean;
  onClose: () => void;
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

const CustomModal: React.FC<Props> = ({
  open,
  onClose,
  width = "600px",
  height = "60vh",
  children,
}) => {
  return (
    <Modal
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      // BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{ ...style, width, height, borderRadius: "8px" }}
          tabIndex={-1}
        >
          <StyledModal>{children}</StyledModal>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
