import React, { useEffect } from 'react';
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import { fileAPI } from "../api/fileApi";

export default function TerminalClI() {
    const commandHandler = async (text) => {
        let response;
        let components = text.split(" ");

        if (components.length < 1) {
            response = "Command not found"
        } else {
            const firstArg = components[0];
            const remainingArgs = components.slice(1, components.length);
            if (firstArg === "clear") {
                response = "";
            } else if (firstArg === "cat" && remainingArgs.length >= 1) {
                const requestGetFileContent = async () => {
                    let result = await fileAPI.getFileContent(remainingArgs.join(" "));
                    if (result.code) {
                        response = result.response.data.message;
                    } else {
                        response = result;
                    }
                }
                await requestGetFileContent()
            } else {
                response = "Command not found";
            }
        }

        if (response) {
           TerminalService.emit('response', response)
        } else {
            TerminalService.emit('clear');
        }
    };

    useEffect(() => {
        TerminalService.on('command', commandHandler);

        return () => {
            TerminalService.off('command', commandHandler);
        };
    });

    return (
        <div className="w-full h-[95vh] m-0 py-[80px]">
            <Terminal className="p-5 h-[100%] bg-black text-white break-all" prompt={`$ `} />
        </div>
    );
}
        