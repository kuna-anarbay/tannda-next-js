import React, {Component, useContext, useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import {CSSTransitionProps} from "react-transition-group/CSSTransition";

const TransitionContext = React.createContext({
    parent: {
        show: undefined,
        isInitialRender: false,
        appear: false
    },
})

function useIsInitialRender() {
    const isInitialRender = useRef(true);
    useEffect(() => {
        isInitialRender.current = false;
    }, [])
    return isInitialRender.current;
}

function ReactCSSTransition(props: CSSTransitionProps) {
    const {
        enter = '',
        enterStart = '',
        enterEnd = '',
        leave = '',
        leaveStart = '',
        leaveEnd = '',
        tag = 'div',
        show,
        appear,
        unmountOnExit,
        children
    } = props;
    const enterClasses = enter.split(' ').filter((s) => s.length);
    const enterStartClasses = enterStart.split(' ').filter((s) => s.length);
    const enterEndClasses = enterEnd.split(' ').filter((s) => s.length);
    const leaveClasses = leave.split(' ').filter((s) => s.length);
    const leaveStartClasses = leaveStart.split(' ').filter((s) => s.length);
    const leaveEndClasses = leaveEnd.split(' ').filter((s) => s.length);
    const removeFromDom = unmountOnExit;

    function addClasses(node, classes) {
        classes.length && node.classList.add(...classes);
    }

    function removeClasses(node, classes) {
        classes.length && node.classList.remove(...classes);
    }

    const nodeRef = React.useRef(null);
    const Component = tag;

    return (
        <CSSTransition
            appear={appear}
            nodeRef={nodeRef}
            unmountOnExit={removeFromDom}
            in={show}
            addEndListener={(done) => {
                nodeRef.current.addEventListener('transitionend', done, false)
            }}
            onEnter={() => {
                if (!removeFromDom) nodeRef.current.style.display = null;
                addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses])
            }}
            onEntering={() => {
                removeClasses(nodeRef.current, enterStartClasses)
                addClasses(nodeRef.current, enterEndClasses)
            }}
            onEntered={() => {
                removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses])
            }}
            onExit={() => {
                addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses])
            }}
            onExiting={() => {
                removeClasses(nodeRef.current, leaveStartClasses)
                addClasses(nodeRef.current, leaveEndClasses)
            }}
            onExited={() => {
                removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses])
                if (!removeFromDom) nodeRef.current.style.display = 'none';
            }}
        >
            <Component ref={nodeRef} {...props} style={{display: !removeFromDom ? 'none' : null}}>
                {children}
            </Component>
        </CSSTransition>
    )
}

ReactCSSTransition.defaultProps = {
    enter: '',
    enterStart: '',
    enterEnd: '',
    leave: '',
    leaveStart: '',
    leaveEnd: '',
    tag: 'div',
    unmountOnExit: true,
    children: <div/>,
}

interface TransitionProps {
    show: boolean;
    appear: boolean;
}

export default function Transition(props: TransitionProps & CSSTransitionProps) {
    const {show, appear} = props;
    const {parent} = useContext(TransitionContext);
    const isInitialRender = useIsInitialRender();
    const isChild = show === undefined;

    if (isChild) {
        return (
            <>
                <ReactCSSTransition
                    appear={parent.appear}
                    show={parent.show}
                    {...props}
                />
            </>
        )
    }

    return (
        <TransitionContext.Provider
            value={{
                parent: {
                    show,
                    isInitialRender,
                    appear,
                },
            }}
        >
            <ReactCSSTransition appear={appear} show={show} {...props}/>
        </TransitionContext.Provider>
    )
}
