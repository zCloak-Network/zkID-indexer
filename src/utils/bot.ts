import axios from "axios";
import * as log4js from "./log4js";

export async function sendToBot(url: string, data: IBotMessageCard) {
  await axios
    .post(url, data)
    .then((res) => {
      log4js.info(res.data);
    })
    .catch((error) => {
      log4js.error(error);
    });
}

export const botMessageFormat = (blockNumber: string, message: string) => {
  const botMessage: IBotMessageCard = {
    chat_id: "oc_abcdefg1234567890",
    msg_type: "interactive",
    root_id: "om_4*********************ad8",
    card: {
      config: {
        wide_screen_mode: true,
      },
      elements: [
        {
          fields: [
            {
              is_short: false,
              text: {
                content: blockNumber,
                tag: "lark_md",
              },
            },
          ],
          tag: "div",
        },
        {
          tag: "div",
          text: {
            content: message,
            tag: "lark_md",
          },
        },
      ],
      header: {
        template: "red",
        title: {
          content: "Indexer Error",
          tag: "plain_text",
        },
      },
    },
  };
  return botMessage;
};
export interface IBotMessageCard {
  chat_id: "oc_abcdefg1234567890";
  msg_type: "interactive";
  root_id: "om_4*********************ad8";
  card: {
    config: {
      wide_screen_mode: true;
    };
    elements: [
      {
        fields: [
          {
            is_short: false;
            text: {
              content: string;
              tag: "lark_md";
            };
          }
        ];
        tag: "div";
      },
      {
        tag: "div";
        text: {
          content: string;
          tag: "lark_md";
        };
      }
    ];
    header: {
      template: "red";
      title: {
        content: "Indexer Error";
        tag: "plain_text";
      };
    };
  };
}
