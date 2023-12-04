package web.itmo.lab3.beans;

import jakarta.faces.bean.ApplicationScoped;
import jakarta.faces.bean.ManagedBean;

import java.io.Serializable;
import java.time.LocalDateTime;

@ManagedBean(name = "hitBean")
@ApplicationScoped
public class HitBean implements Serializable {
    private String x = null;
    private String y = null;
    private String R = null;
    private String hit = null;
    private double executionTime;
    private LocalDateTime timestamp = LocalDateTime.now();

    public HitBean(){}

    public String getX(){
        return this.x;
    }

    public String getY(){
        return this.y;
    }

    public String getR(){
        return this.R;
    }

    public String getHit(){
        return this.hit;
    }

    public LocalDateTime getTimestamp() {
        return this.timestamp;
    }

    public void setX(String x){
        this.x = x;
    }

    public double getExecutionTime() {
        return this.executionTime;
    }

    public void setY(String y){
        this.y = y;
    }

    public void setR(String R){
        this.R = R;
    }

    public void setHit(String hit){
        this.hit = hit;
    }

    public void setExecutionTime(double seconds) {
        this.executionTime = seconds;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
