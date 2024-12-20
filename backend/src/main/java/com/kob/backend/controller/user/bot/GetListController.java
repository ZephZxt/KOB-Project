package com.kob.backend.controller.user.bot;

import com.kob.backend.pojo.Bot;
import com.kob.backend.service.user.bot.GetListService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetListController {
  @Autowired
  private GetListService getListService;

  @GetMapping("/user/bot/getlist/")
  public List<Bot> getlist() {
    return getListService.getList();
  }

}
