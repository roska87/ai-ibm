(function () {
    var Message;
    Message = function (arg) {
      (this.text = arg.text), (this.message_side = arg.message_side);
      this.draw = (function (_this) {
        return function () {
          var $message;
          $message = $($(".message_template").clone().html());
          $message.addClass(_this.message_side).find(".text").html(_this.text);
          $(".messages").append($message);
          return setTimeout(function () {
            return $message.addClass("appeared");
          }, 0);
        };
      })(this);
      return this;
    };
    $(function () {
      var getMessageText, message_side, sendMessage, session_id;
      message_side = "right";
      getMessageText = function () {
        var $message_input;
        $message_input = $(".message_input");
        return $message_input.val();
      };
      sendMessage = function (text, user) {
        //user = 'bot' || 'user'
        var $messages, message;
        if (text.trim() === "") {
          return;
        }
        $(".message_input").val("");
        $messages = $(".messages");
        message_side = user === "bot" ? "left" : "right";
        message = new Message({
          text: text,
          message_side: message_side,
        });
        text === "Mamporrero" ? (text = "") : message.draw();
  
        if (user === "user") {
          let message = new Message({
            text: "Escribiendo...",
            message_side: "left",
          });
          message.draw();
  
          let data = { text: text, sessionId: session_id };
          fetch("/api/v1/message", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((response) => {
              $(".messages li").last().remove();
              
              console.log(response);
              session_id = response.sessionId;
              response.result.forEach((generic) => {
                if (generic.response_type === "text") {
                  sendMessage(generic.text, "bot");
                } else if (generic.response_type === "image") {
                  sendMessage(
                    `<img src="${generic.source}" width="250" height="150">`,
                    "bot"
                  );
                } else {
                  sendMessage(JSON.stringify(generic), "bot");
                }
              });
            })
            .catch((error) => console.error("Error:", error));
        }
        return $messages.animate(
          { scrollTop: $messages.prop("scrollHeight") },
          300
        );
      };
      $(".send_message").click(function (e) {
        return sendMessage(getMessageText(), "user");
      });
      $(".message_input").keyup(function (e) {
        if (e.which === 13) {
          return sendMessage(getMessageText(), "user");
        }
      });
      sendMessage("Mamporrero", "user");
    });
  }.call(this));