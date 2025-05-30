import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaFile } from "react-icons/fa";
import { useATHOSInputContext } from "../context";
import { AIEyeIcon, AIEyeOffIcon, AIIconWrapper, AIInput, AIInputWrapper, AILockIcon, AIUserIcon } from "../styled";

const AnimLoading = motion(CgSpinner);
const variants = {
  closed: {
    opacity: 0,
    scale: 0.5,
  },
  open: {
    opacity: 1,
    scale: 1,
  },
  rotate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
    },
  },
};

export const Input = () => {
  const {
    props,
    backgroundColor,
    hasError,
    isFocused,
    files,
    iconColor,
    updating,
    setHasEdited,
    setFiles,
    showPassword,
    outlineColor,
    setChecked,
    setIsHovered,
    setShowPassword,
    setIsFocused,
    textColor,
    checked,
  } = useATHOSInputContext();
  const { disabled, placeholder, icon, type, innerPadding, value, onChange, onFocus, onBlur, id } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <AIInputWrapper
      paddingHorizontal={innerPadding?.horizontal}
      onClick={(e) => {
        type == "check" && setChecked(!checked);
        /*  if (isFocused) {
          inputRef.current?.blur();
          setIsFocused(false);
        } else {
          inputRef.current?.focus();
          setIsFocused(true);
        } */
      }}
      /* onFocus={() => {
        alert("focus");
      }}
      onBlur={() => {
        alert("blur");
      }} */
      disabled={disabled}
      error={hasError}
      focused={isFocused}
      bgColor={backgroundColor}
      outlineColor={outlineColor}
      textColor={textColor}
      className={`select-none ${type === "check" ? "!rounded-full aspect-square !cursor-pointer" : ""} ${
        checked ? "transition-colors !bg-red-500" : ""
      } ${type === "file" ? "!pr-0" : ""} `}
    >
      <div
        style={{
          padding: `${innerPadding?.vertical ? innerPadding?.vertical : "0.5rem"} 0`,
        }}
        className={`flex ${type === "file" ? "w-[70%]" : "w-full"} ${
          type === "check" ? "w-full h-full" : "overflow-hidden items-center gap-2"
        } `}
      >
        {type === "check" ? (
          checked && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="bg-white w-full h-full rounded-full" />
          )
        ) : (
          <>
            {icon ? (
              icon
            ) : (
              <>
                {type === "user" ? (
                  <AIUserIcon size={15} error={hasError} />
                ) : (
                  type === "password" && <AILockIcon size={15} error={hasError} />
                )}
                {type === "file" && (
                  <div className="flex items-center gap-2">
                    <FaFile />
                    {files && files.length > 0 ? (
                      Array.from(files).map((file) => (
                        <p key={file.name}>{file.name.length > 10 ? `${file.name.slice(0, 10)}...` : file.name}</p>
                      ))
                    ) : (
                      <p>Selecione um arquivo</p>
                    )}
                  </div>
                )}
              </>
            )}

            <AIInput
              id={id}
              //ref={inputRef}
              disabled={disabled}
              className="w-full"
              value={value}
              onChange={(e) => {
                onChange && onChange(e);
                setHasEdited(true);
                type == "file" && setFiles(e.target.files);
              }}
              style={
                type === "file"
                  ? {
                      display: "none",
                    }
                  : undefined
              }
              onFocus={onFocus}
              onBlur={onBlur}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseOut={() => setIsHovered(false)}
              onMouseOver={() => setIsHovered(true)}
              type={type === "password" && showPassword ? "text" : type}
              placeholder={type === "user" ? "Usuário" : type === "password" ? "Senha" : placeholder}
              {...Object.fromEntries(
                Object.entries(props).filter(
                  ([key]) => !["onChange", "onBlur", "onFocus", "value", "className", "style", "type"].includes(key)
                )
              )}
            />
          </>
        )}
      </div>
      <AnimatePresence>
        {updating && (
          <AnimLoading
            size={21}
            variants={variants}
            initial="closed"
            animate={["open", "rotate"]}
            exit="closed"
            color={iconColor}
            className="transform-gpu"
            transition={{
              ease: "anticipate",
            }}
          />
        )}
      </AnimatePresence>
      {type === "password" && (
        <AIIconWrapper
          iconSize={"1.2rem"}
          style={{
            color: iconColor,
          }}
        >
          {showPassword ? (
            <AIEyeIcon onClick={() => setShowPassword(!showPassword)} />
          ) : (
            <AIEyeOffIcon onClick={() => setShowPassword(!showPassword)} />
          )}
        </AIIconWrapper>
      )}
      {type === "file" && (
        <label
          style={{
            outlineColor: outlineColor,
          }}
          htmlFor={id}
          className={`${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } py-[0.5rem] px-[0.6rem] bg-black/5 rounded-lg outline-1 outline`}
        >
          Procurar
        </label>
      )}
    </AIInputWrapper>
  );
};
