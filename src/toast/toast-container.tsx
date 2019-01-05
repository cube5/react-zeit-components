import * as React from "react";
import styled from "@emotion/styled";
import Button, { IButtonProps } from "../button";

export interface IToastContainerButtonProps extends IButtonProps {
  text: string;
}

export interface IToastContainerProps {
  buttonProps?: IToastContainerButtonProps;
}

const ToastContainerStyles = styled.div`
  width: 420px;
  height: 72px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  transition: all 0.4s ease 0s;
  opacity: 1;
  /* animation: show-jsx-1285904019 0.4s ease 0s 1 normal forwards running; */
  transform: translate3d(0px, 100%, 0px) scale(1);
`;

const ToastStyles = styled.div`
  width: 420px;
  background: white none repeat scroll 0% 0%;
  color: black;
  border: 0px none;
  border-radius: 5px;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 9px;
  font-size: 14px;
  display: flex;
  transition: all 0.4s ease 0s;
`;

const Message = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  margin-top: -1px;
`;

export default class ToastContainer extends React.Component<
  IToastContainerProps
> {
  public static defaultProps = {
    buttoProps: null,
  };

  public state = {
    visible: false,
  };

  public componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 10);
  }

  public render() {
    const { buttonProps } = this.props;
    const { visible } = this.state;
    return (
      <ToastContainerStyles className={visible ? "visible" : ""}>
        <ToastStyles>
          <Message style={{ width: buttonProps ? "70%" : "100%" }}>
            {this.props.children}
          </Message>
          {buttonProps ? (
            <Button {...buttonProps} size="sm">
              {buttonProps.text}
            </Button>
          ) : null}
        </ToastStyles>
      </ToastContainerStyles>
    );
  }
}
