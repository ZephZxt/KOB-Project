package com.kob.backend.service.impl.user.bot;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.BotMapper;
import com.kob.backend.pojo.Bot;
import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.bot.AddService;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AddServiceImpl implements AddService {

  @Autowired
  private BotMapper botMapper;

  @Override
  public Map<String, String> add(Map<String, String> data) {
    UsernamePasswordAuthenticationToken authenticationToken =
        (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
    UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
    User user = loginUser.getUser();

    String title = data.get("title");
    String content = data.get("content");
    String description = data.get("description");
    Map<String, String> map = new HashMap<>();

    if(title == null || title.isEmpty()) {
      map.put("error_message", "标题不能为空");
      return map;
    }
    if(title.length() > 100) {
      map.put("error_message", "标题长度不能大于100");
      return map;
    }
    if(content == null || content.isEmpty()) {
      map.put("error_message", "代码不能为空");
      return map;
    }
    if(description == null || description.isEmpty()) {
      description = "这个用户很懒， 什么也没写~";
    }
    if(description.length() > 300) {
      map.put("error_message", "Bot的描述长度不能大于300");
      return map;
    }
    if(content.length() > 10000) {
      map.put("error_message", "代码长度不能大于10000");
      return map;
    }
    QueryWrapper<Bot> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("user_id", user.getId());
    if(botMapper.selectCount(queryWrapper) >= 10) {
      map.put("error_message", "最多只能创建10个");
      return map;
    }

    Date now = new Date();
    Bot bot = new Bot(null, user.getId(), title, description, content, now, now);

    botMapper.insert(bot);
    map.put("error_message", "success");


    return map;
  }
}
