import { GoSignOut } from "react-icons/go";
import JSBExitOption from "./ExitOption";
import JSBOption from "./Option";
import JSBSubOption from "./SubOption";
import { JvrisSideBarDataI, JvrisSideBarProvider } from "./context";
import { JSBContainer, JSBWrapper } from "./styled/styled";

interface JvrisSideBarProps {
    size?: number;
    onExit?: () => void;
    goToFirstSubOnOpen?: boolean;
    options: JvrisSideBarDataI[];
}

/**
 * `size` is default to 4.2
 */

const JvrisSideBar = ({
    size = 4.2,
    onExit,
    goToFirstSubOnOpen,
    options
}: JvrisSideBarProps) => {
    return (
        <JvrisSideBarProvider
            propsData={options}
            size={size}
            goToFirstSubOnOpen={goToFirstSubOnOpen}
        >
            <JSBContainer size={size}>
                <JSBWrapper size={size}>
                    {options.map((data, index) => (
                        <JSBOption
                            iconSize={data.iconSize}
                            key={index}
                            index={index}
                            Icon={data.Icon}
                            label={data.label}
                        >
                            {data.subOptions &&
                                data.subOptions.map((subOption, subIndex) => (
                                    <JSBSubOption
                                        parentIndex={index}
                                        key={subIndex}
                                        index={subIndex}
                                        label={subOption.label}
                                    />
                                ))}
                        </JSBOption>
                    ))}
                </JSBWrapper>
                {onExit && (
                    <JSBExitOption
                        iconSize={"2rem"}
                        onClick={onExit}
                        Icon={GoSignOut}
                        label={"Sair"}
                    />
                )}
            </JSBContainer>
        </JvrisSideBarProvider>
    );
};

export default JvrisSideBar;
