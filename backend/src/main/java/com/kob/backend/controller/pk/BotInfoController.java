package com.kob.backend.controller.pk;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pk/")
public class BotInfoController {
  @RequestMapping("getbotinfo/")
  public Map<String, String> getBotInfo() {
    Map<String, String> bot1 = new HashMap<String, String>();
    bot1.put("name", "tiger");
    bot1.put("rating", "1500");
    return bot1;
  }
}
