package web.itmo.lab3.database;

import io.github.cdimascio.dotenv.Dotenv;
import web.itmo.lab3.beans.HitBean;
import web.itmo.lab3.beans.HitBeanList;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class DBHandler {
    private final String url;
    private final String user;
    private final String password;
    public DBHandler() {
        Dotenv dotenv = Dotenv.configure()
                              .directory("/Users/daniildiveev/Desktop/web/lab3/src/main/resources/.env")
                              .load();

        String name = dotenv.get("DB_NAME");
        String port = dotenv.get("DB_PORT");
        String host = dotenv.get("DB_HOST");

        this.user = dotenv.get("DB_USER");
        this.password = dotenv.get("DB_PASSWORD");
        this.url = "jdbc:postgresql://" + host + ":" + port + "/" + name;

        try (Connection conn = DriverManager.getConnection(url, user, password)){
            try (Statement statement = conn.createStatement()){
                statement.executeQuery("CREATE TABLE IF NOT EXISTS hits (" +
                                           "id SERIAL PRIMARY KEY," +
                                           "x FLOAT," +
                                           "y FLOAT," +
                                           "R FLOAT," +
                                           "hit TEXT," +
                                           "date_part TIMESTAMP," +
                                           "execution_time FLOAT" +
                                        ");");
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        };
    }

    public HitBeanList getAllHitChecks() {
        ArrayList<HitBean> beanList = new ArrayList<HitBean>();

        try (Connection conn = DriverManager.getConnection(this.url)) {
            try (Statement statement = conn.prepareStatement("SELECT * FROM hits")) {
                ResultSet result = statement.getResultSet();

                while (result.next()) {
                    String x = Float.toString(result.getFloat(2));
                    String y = Float.toString(result.getFloat(3));
                    String R = Float.toString(result.getFloat(4));
                    String hit = result.getString(5);
                    LocalDateTime timestamp = result.getTimestamp(6).toLocalDateTime();
                    float executionTime = result.getFloat(7);

                    HitBean newBean = new HitBean();
                    newBean.setX(x);
                    newBean.setY(y);
                    newBean.setR(R);
                    newBean.setHit(hit);
                    newBean.setTimestamp(timestamp);
                    newBean.setExecutionTime(executionTime);

                    beanList.add(newBean);
                }

                HitBeanList newHitBeanList = new HitBeanList();
                newHitBeanList.setHits(beanList);

                return newHitBeanList;
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return null;
    }

    public void addBean(HitBean bean) {
        String addBeanQuery = "INSERT INTO hits VALUES (DEFAULT, ?, ?, ?, ?, ?, ?);";

        try (Connection conn = DriverManager.getConnection(this.url, this.user, this.password)) {
            try (PreparedStatement statement = conn.prepareStatement(addBeanQuery)) {
                statement.setFloat(1, Float.parseFloat(bean.getX()));
                statement.setFloat(2, Float.parseFloat(bean.getY()));
                statement.setFloat(3, Float.parseFloat(bean.getR()));
                statement.setString(4, bean.getHit());
                statement.setTimestamp(5, Timestamp.valueOf(bean.getTimestamp()));
                statement.setFloat(6, (float) bean.getExecutionTime());

                //TODO: think of cases when parameters are null

                statement.executeQuery();
            }
        } catch (SQLException | NumberFormatException e) {
            System.out.println(e.getMessage());
        }
    }
}
