import * as React from "react";
import classNames from "classnames";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import ButtonAnimation from "./button-animation";

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: "primary" | "secondary" | "abort" | "danger" | "highlight";
  size?: "md" | "sm";
  loading?: boolean;
  raised?: boolean;
}

export interface IButtonState {
  animationStartAt: null | number;
  animationX: null | number;
  animationY: null | number;
}

const StyledButton = styled.button`
  appearance: none;
  align-items: center;
  border: 1px solid var(--primary);
  display: inline-flex;
  width: 200px;
  height: 40px;
  padding: 0 25px;
  outline: none;
  font-size: 12px;
  justify-content: center;
  text-transform: uppercase;
  cursor: pointer;
  text-align: center;
  user-select: none;
  font-weight: 100;
  position: relative;
  overflow: hidden;
  transition: border 0.2s, background 0.2s, color 0.2s ease-out;
  border-radius: 5px;
  white-space: nowrap;
  text-decoration: none;
  line-height: 0;

  color: #fff;
  background-color: var(--primary);
  &:hover {
    color: var(--primary);
    background: #fff;
  }

  & b {
    display: inline-block;
    overflow: none;
    z-index: 100;
    font-weight: 500;
    position: relative;
  }

  &.small {
    height: 24px;
    width: 100px;
    padding: 0 10px;
    font-size: 12px;
  }

  &.primary {
    border-color: var(--primary);
    background-color: var(--primary);
    color: #fff;
    &:hover {
      color: var(--primary);
      background: #fff;
    }
  }

  &.secondary {
    background: var(--secondary);
    border: 1px solid #eaeaea;
    color: #666;
    &:hover {
      color: rgb(0, 0, 0);
      border-color: rgb(0, 0, 0);
      background: rgb(255, 255, 255);
    }
  }

  &.disabled {
    cursor: not-allowed;
    color: rgb(204, 204, 204);
    background: rgb(250, 250, 250);
    border-color: rgb(234, 234, 234);
  }

  &.loading {
    pointer-events: none;
    background: #fafafa;
    border-color: #eaeaea;
    color: transparent;
    position: relative;
  }

  &.abort {
    background-color: transparent;
    border-color: transparent;
    color: #666;
  }

  &.danger {
    border-color: var(--danger);
    background-color: var(--danger);
    color: #fff;
    &:hover {
      color: var(--danger);
      background: #fff;
    }
  }

  &.highlight {
    border-color: var(--highlight);
    background-color: var(--highlight);
    color: #fff;
    &:hover {
      color: var(--highlight);
      background: #fff;
    }
  }

  &.raised {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    transition: all 0.15s ease;
  }
`;

const Loading = styled.span`
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & span {
    font-weight: 500;

    & span:nth-child(2) {
      animation-delay: 0.2s;
    }

    & span:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

const blink = keyframes`
    0% {
      opacity: 0.2;
    }

    20% {
        opacity: 1;
    }
    100% {
        opacity: 0.2;
    }
  `;

const LoadingItem = styled.span`
  animation: 1.4s ${blink} infinite both;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #444444;
  display: inline-block;
  margin: 0 1px;
`;

const LoadingDots = () => (
  <Loading>
    <span>
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
    </span>
  </Loading>
);

const ShadowedButtonWrapper = styled.div`
  height: 40px;
  width: 200px;
  display: inline-flex;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover button {
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.16);
    transform: translateY(-1px);
    color: initial;
    background: initial;
  }
`;

export default class Button extends React.Component<
  IButtonProps,
  IButtonState
> {
  static defaultProps = {
    color: "primary",
    size: "md"
  };

  public el: any = null;

  public state = {
    animationStartAt: null,
    animationX: null,
    animationY: null
  };

  public onElement = (el: any) => {
    this.el = el;
  };

  onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = this.el!.getBoundingClientRect();
    this.setState({
      animationStartAt: Date.now(),
      animationX: e.clientX - rect.left,
      animationY: e.clientY - rect.top
    });

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  onAnimationComplete = () =>
    this.setState({
      animationStartAt: null,
      animationX: null,
      animationY: null
    });

  render() {
    const { color, size, disabled, loading, raised, className } = this.props;
    const { animationStartAt, animationX, animationY } = this.state;

    const buttonClassName = classNames(
      { primary: color === "primary" },
      { secondary: color === "secondary" },
      { abort: color === "abort" },
      { highlight: color === "highlight" },
      { danger: color === "danger" },
      { small: size === "sm" },
      { disabled },
      { loading },
      { raised },
      className
    );
    const ButtonWrapper = raised ? ShadowedButtonWrapper : React.Fragment;
    return (
      <ButtonWrapper>
        <StyledButton
          {...this.props}
          ref={this.onElement}
          aria-disabled={disabled}
          className={buttonClassName}
          onClick={this.onClick}
        >
          <b>
            {this.props.children} {loading ? <LoadingDots /> : null}
          </b>
          {animationStartAt ? (
            <ButtonAnimation
              x={animationX}
              y={animationY}
              onComplete={this.onAnimationComplete}
            />
          ) : null}
        </StyledButton>
      </ButtonWrapper>
    );
  }
}

// const Button2: React.SFC<IButtonProps> = props => {
//   const { color, size, disabled, loading, raised } = props;
//   const className = classNames(
//     { primary: color === "primary" },
//     { secondary: color === "secondary" },
//     { abort: color === "abort" },
//     { highlight: color === "highlight" },
//     { danger: color === "danger" },
//     { small: size === "sm" },
//     { disabled },
//     { loading },
//     { raised },
//     props.className
//   );

//   const ShadowedButtonWrapper = styled.div`
//     height: 40px;
//     width: 200px;
//     display: inline-flex;
//     cursor: pointer;
//     transition: all 0.15s ease;

//     &:hover button {
//       box-shadow: 0 7px 20px rgba(0, 0, 0, 0.16);
//       transform: translateY(-1px);
//       color: initial;
//       background: initial;
//     }
//   `;

//   const ButtonWrapper = props.raised ? ShadowedButtonWrapper : React.Fragment;

//   return (
//     <ButtonWrapper>
//       <StyledButton className={className} {...props}>
//         <b>
//           <>
//             {props.children} {props.loading ? <LoadingDots /> : null}
//           </>
//         </b>
//       </StyledButton>
//     </ButtonWrapper>
//   );
// };

// Button.defaultProps = {
//   color: "primary",
//   size: "md"
// };

// export default Button;
