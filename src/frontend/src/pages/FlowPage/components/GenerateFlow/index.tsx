import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../../components/ui/drawer";

import { useEffect, useRef, useState } from "react";

import { Paperclip } from "lucide-react";
import ForwardedIconComponent from "../../../../components/genericIconComponent";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

export const GenerateFlowSlide = () => {
  const [message, setMessage] = useState("");
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
  const textareaRef = useRef(null);

  const handleInputChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setMessage(value);
    setIsSendButtonDisabled(value.trim() === "");
  };

  useEffect(() => {
    if (textareaRef.current) {
      // @ts-ignore
      textareaRef.current.style.height = "auto";
      // @ts-ignore
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      // @ts-ignore
      textareaRef.current.style.overflowY = "auto";
    }
  }, [textareaRef.current, message]);

//   useEffect(() => {
//     if (textareaRef.current) {
//       // @ts-ignore
//       textareaRef.current.style.height = "auto";
//       // @ts-ignore
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//       // @ts-ignore
//       textareaRef.current.style.overflowY = "auto";
//     }
//   }, [textareaRef.current]);

  const handleSendClick = () => {
    // Implement send message functionality here
    console.log("Message sent: ", message);
  };

  console.log('===  index.tsx [32] ===', textareaRef.current);

  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent className="px-2 top-[20%] pb-2">
        <DrawerHeader className="!py-0">
            <div className="flex items-center justify-end">

          <DrawerClose className="!p-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            {/* <ForwardedIconComponent className="text-muted-foreground hover:text-black" name="X" /> */}
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DrawerClose>
            </div>
{/*
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
        </DrawerHeader>
        <div className="flex w-full items-center justify-between h-full">
        {/* bg-muted/50 */}
          <div className="relative flex h-full min-h-[50vh] w-full flex-col rounded-xl p-0 pt-4 lg:col-span-2">
            {/* <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge> */}
            {/* <p className="text-center text-wrap flex-wrap whitespace-normal">

            </p>
             */}
            <div className="flex-1" />
            <form
              className="w-full"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r55:"
              data-state="closed"
            >
              <div className="relative flex h-full max-w-full flex-1 flex-col">
                <div className="absolute bottom-full left-0 right-0 z-20"></div>
                <div className="flex w-full items-center">
                  <div className="dark:bg-token-main-surface-secondary flex w-full flex-col gap-1.5 rounded-[26px] border bg-[#f4f4f4] p-1.5 transition-colors border-black">
                    <div className="flex h-full flex-row items-end gap-1.5 md:gap-2">
                      <div
                        className={
                          "flex h-full flex-col items-center justify-center p-1"
                        }
                      >
                        <div className="flex h-full flex-col items-center justify-center">
                          <input
                            multiple
                            type="file"
                            tabIndex={-1}
                            className="hidden"
                            style={{ display: "none" }}
                          />
                          <button
                            type="button"
                            id="radix-:r5b:"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            data-state="closed"
                            className="text-token-text-primary dark:transparent hover:bg-token-main-surface-secondary dark:hover:bg-token-main-surface-secondary focus-visible:bg-token-main-surface-secondary radix-state-active:text-token-text-secondary radix-disabled:cursor-auto radix-disabled:bg-transparent radix-disabled:text-token-text-tertiary dark:radix-disabled:bg-transparent m-0 inline-flex h-0 w-0 cursor-pointer items-center justify-center gap-1 rounded-lg border border-none border-transparent bg-transparent p-0 text-sm leading-none outline-none dark:bg-transparent"
                          ></button>
                          <button
                            className="text-token-text-primary juice:h-8 juice:w-8 juice:rounded-full juice:mb-1 juice:ml-1.5 flex items-center justify-center focus-visible:outline-black dark:text-white dark:focus-visible:outline-white"
                            aria-disabled="false"
                          >
                            <Paperclip className="size-6" />
                          </button>
                          <div
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="radix-:r5d:"
                            data-state="closed"
                          ></div>
                        </div>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col py-1 pb-1">
                        <textarea
                          id="prompt-textarea"
                          tabIndex={0}
                          dir="auto"
                          rows={1}
                          placeholder="Message AI"
                          className="text-token-text-primary m-0 max-h-[25dvh] max-h-52 resize-none border-0 bg-transparent px-0 outline-none ring-transparent focus:ring-0 focus-visible:ring-0"
                          value={message}
                          onChange={handleInputChange}
                          ref={textareaRef}
                        ></textarea>
                      </div>
                      <button
                        data-testid="fruitjuice-send-button"
                        className="disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white"
                        disabled={isSendButtonDisabled}
                        onClick={handleSendClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill={isSendButtonDisabled ? "#c9c9c9" : "white"}
                          viewBox="0 0 32 32"
                          className="icon-2xl"
                        >
                          <path
                            fill={isSendButtonDisabled ? "#c9c9c9" : "white"}
                            fillRule="evenodd"
                            d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </DrawerContent>
    </Drawer>
  );
};